# Personal Web Application - Replit.md

## Overview

This is a full-stack web application built with React (frontend) and Express.js (backend). The application appears to be a personal/romantic themed web interface with Turkish content, featuring an elegant purple design theme and interactive pages. It includes a modern tech stack with TypeScript, Tailwind CSS, shadcn/ui components, and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.
Navigation preference: Sixth page set as homepage/landing page (default route "/" now points to sixth page).
Game preference: Complex maze game with moving monsters as the primary game on homepage before the original platform game.
Navigation buttons: Updated to show "Diğer Sayfalar" and "2. Sayfa" buttons on main page.
Navigation flow: Sequential navigation established: Sixth page (homepage) → Landing page → Second page → Third page → Fourth page → Fifth page → Seventh page. The "2. Sayfa" button on homepage goes to landing page, then flows sequentially through numbered pages.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state
- **Build Tool**: Vite for development and building

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Management**: Prepared for connect-pg-simple (PostgreSQL sessions)
- **Development**: tsx for TypeScript execution in development

### Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions and configurations
├── server/                 # Backend Express application
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data access layer
│   └── vite.ts            # Development server integration
├── shared/                 # Shared TypeScript definitions
│   └── schema.ts          # Database schema and types
└── migrations/            # Database migration files
```

## Key Components

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Schema Location**: `shared/schema.ts` using Drizzle ORM
- **Database**: PostgreSQL (configured but can be adapted)
- **Migrations**: Managed through Drizzle Kit

### Authentication System
- Prepared infrastructure for user authentication
- In-memory storage implementation (MemStorage) for development
- Interface-based storage design for easy database integration

### UI Theme System
- Custom purple-themed design with CSS variables
- Elegant, romantic aesthetic with decorative hearts
- Responsive design with mobile considerations
- Glass morphism effects and smooth animations

### Development Tools
- Hot module replacement with Vite
- TypeScript strict mode enabled
- ESLint and development error overlays
- Replit-specific development banner integration

## Data Flow

### Current Implementation
1. **Client Routing**: Wouter handles client-side navigation
2. **API Communication**: React Query manages server state and caching
3. **Data Storage**: Interface-based storage system (currently in-memory)
4. **State Management**: Local React state + React Query for server state

### API Structure
- RESTful API design pattern
- JSON request/response format
- Error handling middleware
- Request logging for API endpoints

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, React DOM
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **UI Components**: Radix UI primitives, Lucide React icons
- **State Management**: TanStack React Query
- **Routing**: Wouter
- **Forms**: React Hook Form with Zod validation
- **Utilities**: clsx, class-variance-authority, date-fns

### Backend Dependencies
- **Web Framework**: Express.js
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Session Management**: connect-pg-simple
- **Development**: tsx, esbuild
- **Validation**: Zod with Drizzle integration

### Development Tools
- **Build**: Vite, esbuild
- **TypeScript**: Full TypeScript support across stack
- **Replit Integration**: Cartographer plugin, runtime error modal

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations managed separately

### Environment Configuration
- **Development**: tsx server with Vite middleware integration
- **Production**: Node.js serves bundled application
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Hosting Considerations
- **Static Assets**: Served from built frontend
- **API Routes**: Express server handles `/api/*` routes
- **Database**: Configured for Neon PostgreSQL (serverless)
- **Sessions**: PostgreSQL-backed session storage

### Scripts
- `npm run dev`: Development with hot reloading
- `npm run build`: Production build
- `npm run start`: Production server
- `npm run db:push`: Database schema updates

## Recent Optimizations (August 2025)

### Performance Improvements
- **Loading Screen**: Added elegant loading animation with heartbeat effect
- **Error Boundary**: Implemented React error boundary for graceful error handling
- **Game Performance**: Optimized monster movement and collision detection algorithms
- **Memory Management**: Reduced unnecessary re-renders and improved cleanup

### Reliability Enhancements
- **Rate Limiting**: Added simple rate limiting (100 requests/minute) to prevent abuse
- **Health Check**: Added `/api/health` endpoint for monitoring
- **Better Error Handling**: Enhanced API error responses with detailed messages
- **Query Optimization**: Improved React Query configuration with smart retry logic

### User Experience
- **SEO Optimization**: Added proper meta tags, Open Graph tags for social sharing
- **Turkish Language**: Set proper language attribute and localized loading text
- **Responsive Design**: Maintained mobile-friendly interface throughout
- **Error Recovery**: Automatic page reload option when errors occur

### GitHub Pages Deployment Ready
- **Static Build**: Complete frontend build in dist/public/ directory
- **SPA Support**: 404.html and redirect handling for Single Page Application routing
- **Asset Management**: Relative paths configured for GitHub Pages compatibility
- **Jekyll Disabled**: .nojekyll file prevents Jekyll processing
- **Automated Deployment**: GitHub Actions workflow ready (.github/workflows/deploy.yml)
- **Manual Deployment**: Build script (build-frontend.sh) for manual uploads
- **Documentation**: Complete setup guide (GITHUB_PAGES_SETUP.md)

## Notes

- The application currently uses in-memory storage but is designed to easily integrate with PostgreSQL
- The romantic/personal theme suggests this is a custom application for a specific relationship context
- Turkish language content indicates the target audience
- All UI components follow the shadcn/ui design system for consistency
- The codebase is well-structured for both development and production deployment
- Optimized for sharing with friends - reliable performance and error handling