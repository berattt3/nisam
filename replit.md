# Personal Romantic Web Application

## Overview

This is a Turkish-language romantic web application featuring interactive games, story pages, and personal messaging. The app is built as a full-stack application with React frontend and Express backend, designed as a personal gift with romantic themes, games, and interactive elements. It includes multiple themed pages with games like maze navigation and heart-collection puzzles, along with wish submission functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern React features
- **Routing**: Wouter for lightweight client-side routing with 7 themed pages
- **Styling**: Tailwind CSS with custom purple/romantic color scheme and shadcn/ui components
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: shadcn/ui component library built on Radix UI primitives

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Configured for connect-pg-simple PostgreSQL sessions
- **API Design**: RESTful API with rate limiting and error handling
- **Development**: tsx for TypeScript execution in development mode

### Database Schema
- **Users Table**: ID, username, password for potential authentication
- **Wishes Table**: ID, wish content, creation timestamp for user submissions
- **Schema Management**: Drizzle Kit for migrations and PostgreSQL dialect

### Application Structure
```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components and shadcn/ui
│   │   ├── pages/          # 7 themed route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and query client
├── server/                 # Express backend
│   ├── routes.ts          # API endpoints with rate limiting
│   ├── storage.ts         # Data access layer with memory fallback
│   └── vite.ts            # Development server integration
├── shared/                 # Shared TypeScript definitions
│   └── schema.ts          # Database schema and Zod validation
└── migrations/            # Database migration files
```

### Key Features
- **Interactive Games**: Complex maze game with moving monsters, heart collection puzzle, drag-and-drop mechanics
- **Romantic Content**: Turkish language love messages, romantic themes, and personal storytelling
- **Wish System**: User can submit wishes that are stored in the database
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Elegant loading screens and transitions

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL with Neon serverless driver (@neondatabase/serverless)
- **ORM**: Drizzle ORM with Zod validation for type-safe database operations
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **Fonts**: Google Fonts (Playfair Display, Inter) for typography
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Code Quality**: ESBuild for production bundling
- **Development**: tsx for TypeScript execution, cross-env for environment variables
- **Replit Integration**: Vite plugins for Replit-specific features

### Deployment
- **GitHub Pages**: Configured for static deployment with SPA routing support
- **Build Output**: Static files optimized for GitHub Pages with proper redirects
- **CI/CD**: GitHub Actions workflow for automated deployment