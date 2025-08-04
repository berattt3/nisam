# afyonlu - Personal Web Application

## Overview

This is a romantic-themed personal web application built as an interactive love story between Berat and Nisa. The application features multiple pages with games, romantic messages, and interactive elements, all presented in Turkish. It includes a complex maze game with moving monsters, a platform game, interactive heart-filling mechanics, envelope message systems, and wish submission functionality. The application is designed as a single-page application (SPA) with smooth navigation between different themed pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern React features
- **Styling**: Tailwind CSS with custom CSS variables for consistent theming and responsive design
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessible, high-quality components
- **Routing**: Wouter for lightweight client-side routing in SPA configuration
- **State Management**: TanStack React Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds
- **Fonts**: Custom Google Fonts integration (Playfair Display for headings, Inter for body text)

### Backend Architecture
- **Framework**: Express.js with TypeScript for API endpoints
- **Runtime**: Node.js with ES modules support
- **Database ORM**: Drizzle ORM configured for PostgreSQL with schema-first approach
- **Session Management**: Prepared infrastructure for connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution in development mode
- **Storage**: In-memory storage implementation with interface for future database integration

### Key Design Patterns
- **Component Architecture**: Reusable UI components with consistent styling through Tailwind classes
- **Error Boundaries**: React error boundaries for graceful error handling with custom error pages
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Game Architecture**: Canvas-based games with state management for player positions, collision detection, and game mechanics
- **Route-based Code Splitting**: Each page is a separate component for better performance
- **Type Safety**: Comprehensive TypeScript integration across frontend and backend with shared schema types

### Database Schema
- **Users Table**: ID, username, password for future authentication
- **Wishes Table**: ID, wish content, created timestamp for storing user wishes
- **Shared Types**: Drizzle-generated types shared between frontend and backend for type consistency

### Navigation Flow
The application implements a sequential navigation system:
1. Sixth Page (Homepage/Landing) - Complex maze game with moving monsters
2. Landing Page - Welcome message and confirmation
3. Second Page - Heart placement drag-and-drop game
4. Third Page - Interactive heart-filling with romantic messages
5. Fourth Page - Envelope opening with multiple love messages
6. Fifth Page - Wish submission form with privacy toggle
7. Seventh Page - Final interactive proposal with animated elements

### Deployment Architecture
- **GitHub Pages Compatibility**: SPA routing configuration with 404.html redirect handling
- **Build Process**: Automated build pipeline with GitHub Actions support
- **Static Asset Handling**: Vite-optimized asset bundling with proper relative paths
- **Development Integration**: Hot module replacement and development server integration

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing
- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-kit**: Database migration and schema management tools

### UI and Styling Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating component variants
- **clsx**: Conditional className utility
- **lucide-react**: Icon library

### Database and Backend Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database driver
- **connect-pg-simple**: PostgreSQL session store for Express
- **express**: Web framework for API endpoints

### Development and Build Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds

### Validation and Utilities
- **zod**: Schema validation for runtime type checking
- **date-fns**: Date manipulation utilities
- **nanoid**: Unique ID generation

The application is configured for deployment on GitHub Pages with automatic builds and includes comprehensive error handling, loading states, and mobile responsiveness throughout the user experience.