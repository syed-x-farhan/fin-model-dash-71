# Financial Dashboard Application

## Overview

This is a comprehensive financial modeling dashboard application built with React, TypeScript, and Express.js. The application allows users to create, configure, and visualize various financial models including 3-Statement Models, DCF Valuations, LBO Analysis, and Startup Models. It features Excel data import capabilities, interactive dashboards, and a modern UI built with shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks with local state, TanStack Query for server state
- **Routing**: React Router for client-side navigation
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Recharts for financial data visualization

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Driver**: @neondatabase/serverless for serverless PostgreSQL
- **Development**: Hot reload with Vite integration
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Key Components

#### 1. Financial Model System
- **Model Types**: 3-Statement, DCF, LBO, Startup models
- **Variable Management**: Dynamic variable configuration with categories
- **Calculation Engine**: Client-side financial calculations with mock data
- **Dashboard Components**: Specialized dashboards for each model type

#### 2. Excel Import System
- **Import Wizard**: Multi-step wizard for Excel file processing
- **Column Mapping**: Intelligent mapping of Excel columns to financial categories
- **Data Preview**: Real-time preview and editing of imported data
- **Data Validation**: Type checking and error handling for imported data

#### 3. UI Components
- **Sidebar Navigation**: Collapsible sidebar with model selection
- **Variable Editor**: Dynamic form components for financial variables
- **Chart Components**: Interactive charts using Recharts
- **Modal System**: Dialog-based workflows for complex operations

#### 4. Authentication Context
- **Token Management**: JWT token storage and validation
- **Protected Routes**: Authentication-aware routing
- **Session Persistence**: LocalStorage-based session management

## Data Flow

### 1. Model Configuration Flow
1. User selects model type from sidebar
2. Model configuration loads from local storage or defaults
3. Variable sections render dynamically based on model type
4. Form submissions update local storage and trigger calculations
5. Results display in model-specific dashboards

### 2. Excel Import Flow
1. User uploads Excel file through import wizard
2. File parsing extracts data and column information
3. Column mapping interface allows user to map Excel columns to financial categories
4. Data preview shows processed data with editing capabilities
5. Import completion integrates data into model calculations

### 3. Dashboard Data Flow
1. Dashboard components consume model variables and calculations
2. Mock data provides realistic financial projections
3. Chart components render data visualizations
4. User interactions trigger recalculations and updates

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React Router, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Data Visualization**: Recharts for charts and graphs
- **State Management**: TanStack Query for server state
- **Form Validation**: Zod for schema validation
- **Utilities**: clsx, tailwind-merge, date-fns

### Database & Backend
- **Database**: Drizzle ORM with PostgreSQL
- **Server**: Express.js with TypeScript
- **Session**: connect-pg-simple for session management
- **Development**: tsx for TypeScript execution, esbuild for bundling

### Development Tools
- **Build**: Vite with React plugin
- **Replit Integration**: Replit-specific plugins for development environment
- **Code Quality**: TypeScript with strict configuration
- **Styling**: Tailwind CSS with PostCSS

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot reload
- **Database**: PostgreSQL with Drizzle migrations
- **Environment Variables**: DATABASE_URL for database connection
- **Replit Integration**: Cartographer plugin for Replit-specific features

### Production Build
- **Frontend**: Vite build process generating optimized static assets
- **Backend**: esbuild bundling Express server to dist/index.js
- **Database**: Drizzle push for schema synchronization
- **Static Files**: Express serves built frontend from dist/public

### Database Management
- **Schema**: Defined in shared/schema.ts using Drizzle ORM
- **Migrations**: Generated in migrations directory
- **Connection**: Serverless PostgreSQL via @neondatabase/serverless
- **Storage Interface**: Abstracted storage layer with in-memory fallback

### Scalability Considerations
- **Modular Architecture**: Clear separation between frontend, backend, and shared code
- **Component Organization**: Reusable UI components and dashboard modules
- **Configuration System**: Extensible model configuration system
- **Data Import**: Scalable Excel processing with validation
- **State Management**: Efficient state updates and caching strategies

The application is designed to be easily extensible with additional financial models, enhanced with real-time data feeds, and deployed to various environments while maintaining development simplicity and user experience quality.