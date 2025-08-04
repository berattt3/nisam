import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWishSchema } from "@shared/schema";

// Simple rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 100; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function rateLimit(req: any, res: any, next: any) {
  const clientId = req.ip || 'unknown';
  const now = Date.now();
  
  const clientData = requestCounts.get(clientId) || { count: 0, resetTime: now + RATE_WINDOW };
  
  if (now > clientData.resetTime) {
    clientData.count = 0;
    clientData.resetTime = now + RATE_WINDOW;
  }
  
  clientData.count++;
  requestCounts.set(clientId, clientData);
  
  if (clientData.count > RATE_LIMIT) {
    return res.status(429).json({ error: "Too many requests" });
  }
  
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply rate limiting to API routes
  app.use('/api', rateLimit);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Wish routes with better error handling
  app.post("/api/wishes", async (req, res) => {
    try {
      const validatedData = insertWishSchema.parse(req.body);
      const wish = await storage.createWish(validatedData);
      res.json(wish);
    } catch (error) {
      console.error("Error creating wish:", error);
      res.status(400).json({ 
        error: "Invalid wish data",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/wishes", async (req, res) => {
    try {
      const wishes = await storage.getAllWishes();
      res.json(wishes);
    } catch (error) {
      console.error("Error fetching wishes:", error);
      res.status(500).json({ 
        error: "Failed to fetch wishes",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
