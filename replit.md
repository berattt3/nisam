# Overview

This is a personal romantic web application called "afyonlu" built with React and Express.js. The application features a series of interactive pages with games, messages, and romantic content in Turkish, designed as a personalized love story between two individuals (Berat and Nisa). The app includes complex maze games, interactive elements, drag-and-drop functionality, and a multi-page narrative flow with deployment capabilities for GitHub Pages.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript for type safety and modern development features

**Styling**: Tailwind CSS with custom CSS variables for theming, providing a consistent purple-themed romantic design system

**UI Components**: shadcn/ui component library built on Radix UI primitives for accessible, customizable components

**Routing**: Wouter for lightweight client-side routing with sequential page navigation flow

**State Management**: React Query (@tanstack/react-query) for server state management and caching

**Build Tool**: Vite for fast development and optimized production builds

**Project Structure**:
- `client/src/pages/` - Seven sequential pages with games and interactive content
- `client/src/components/` - Reusable UI components including decorative elements
- `client/src/hooks/` - Custom React hooks for mobile detection and toast notifications
- Custom CSS animations and effects for romantic theming

## Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js with ES modules

**Database ORM**: Drizzle ORM configured for PostgreSQL with schema definitions

**API Design**: RESTful endpoints with rate limiting and error handling

**Session Management**: Prepared infrastructure for PostgreSQL-based sessions using connect-pg-simple

**Development Server**: Integration with Vite for seamless full-stack development

**Storage Layer**: Abstracted storage interface with in-memory implementation for development and PostgreSQL for production

## Key Features

**Interactive Games**: Complex maze game with moving monsters, drag-and-drop heart placement, progressive heart filling mechanics

**Sequential Navigation**: Seven-page story flow with specific routing (sixth page as homepage, sequential progression)

**Dynamic Content**: Romantic messages, cinematic text sequences, interactive question flows with animated elements

**Wish System**: Backend API for creating and storing user wishes with validation

**Responsive Design**: Mobile-optimized layouts with custom animations and decorative elements

**Deployment Ready**: GitHub Pages deployment configuration with SPA routing support

# External Dependencies

## Core Framework Dependencies
- **React 18**: Frontend framework with TypeScript support
- **Express.js**: Backend web framework
- **Vite**: Build tool and development server
- **Wouter**: Lightweight client-side routing

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives (@radix-ui/react-*)
- **shadcn/ui**: Pre-built component library
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility

## Database and Backend
- **Drizzle ORM**: Type-safe PostgreSQL ORM
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments
- **connect-pg-simple**: PostgreSQL session store
- **zod**: Schema validation library

## Development and Deployment
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast JavaScript bundler for production
- **tsx**: TypeScript execution for development
- **Replit plugins**: Development environment integration
- **GitHub Pages**: Static site deployment with SPA routing

## Data Validation and Forms
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Form validation resolvers
- **drizzle-zod**: Database schema validation

## Utilities
- **date-fns**: Date manipulation utilities
- **nanoid**: Unique ID generation
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel functionality