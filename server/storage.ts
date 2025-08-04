import { type User, type InsertUser, type Wish, type InsertWish } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createWish(wish: InsertWish): Promise<Wish>;
  getAllWishes(): Promise<Wish[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private wishes: Map<string, Wish>;

  constructor() {
    this.users = new Map();
    this.wishes = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWish(insertWish: InsertWish): Promise<Wish> {
    const id = randomUUID();
    const wish: Wish = { 
      ...insertWish, 
      id, 
      createdAt: new Date() 
    };
    this.wishes.set(id, wish);
    return wish;
  }

  async getAllWishes(): Promise<Wish[]> {
    return Array.from(this.wishes.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
