# Overview

ChatNeural is a modern AI assistant platform built with Node.js, Express, React, and TypeScript. The application provides users with two distinct AI assistants - Clark (analytical) and Ragnaria (creative) - each with unique personalities and communication styles. The platform features a modern chat interface with bubble-style conversations, automatic language detection (Portuguese/English), and a dedicated email generation tool with multiple tone options. The application includes fixed promotional buttons on the right side with contextual tooltips and multi-language support. The application uses a clean, modern design with centralized layout and is fully optimized for external iframe embedding with comprehensive CORS support.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with React and TypeScript using Vite as the build tool. The application follows a component-based architecture with:
- **State Management**: Custom hooks (`useChat`, `useEmailGenerator`) manage application state without external state management libraries
- **UI Components**: Leverages Radix UI primitives with custom styling through Tailwind CSS for a consistent design system
- **Routing**: Uses Wouter for lightweight client-side routing
- **Styling**: Combines Tailwind CSS with custom CSS variables for theming, implementing a glassmorphism design pattern

## Backend Architecture
The server uses Express.js with TypeScript and follows a modular structure:
- **API Layer**: RESTful endpoints for chat interactions and email generation (`/api/chat`, `/api/email`)
- **AI Integration**: Direct integration with OpenAI's GPT-4o model using the official OpenAI SDK
- **Language Detection**: Server-side language detection algorithm for automatic Portuguese/English switching
- **Session Management**: Stateless design with short conversation history maintained client-side

## Database Design
The application uses Drizzle ORM with PostgreSQL (via Neon) for data persistence:
- **Users Table**: Basic user authentication and profile data
- **Chat Sessions**: Tracks conversation sessions with assistant selection
- **Messages**: Stores individual chat messages with role (user/assistant) and content
- **Email Generations**: Logs email generation requests with prompts, tones, and results

## Assistant System
Two AI personalities with distinct characteristics:
- **Clark**: Analytical assistant with structured, educational responses (max 1 emoji)
- **Ragnaria**: Creative assistant with innovative, friendly communication (2-3 emojis)
- **Multilingual Support**: Automatic system prompt switching based on detected language

## Email Generation Feature
Dedicated email composition tool with:
- **Tone Selection**: Formal, neutral, and friendly options
- **Language Adaptation**: Automatic language detection and appropriate response generation
- **User Interface**: Sidebar panel with copy/regenerate functionality

# External Dependencies

## AI Services
- **OpenAI API**: Primary AI service using GPT-4o model for chat interactions and email generation
- **API Key Management**: Requires `OPENAI_API_KEY` environment variable configuration

## Database Services
- **Neon Database**: PostgreSQL-compatible serverless database for production data storage
- **Drizzle ORM**: Type-safe database interactions with PostgreSQL dialect

## UI Framework & Libraries
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form handling with validation
- **TanStack Query**: Server state management and caching

## Promotional Buttons System
- **Fixed positioning**: Right side of screen (right: 20px, top: 80px)
- **Send Email Button**: Blue button with English tooltip "With Chat Neural, you can create formal, friendly, and neutral emails within the chat"
- **Recipes Button**: Purple button with English tooltip "You can create wedding and birthday cakes with Chat Neural"
- **Tooltip positioning**: Fixed to left side of screen during hover
- **Multi-language selector**: Small dropdown below main buttons with flag indicators

## Development & Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds

## Deployment Platform
- **Replit**: Primary deployment platform with automatic environment detection
- **Environment Variables**: Uses Replit Secrets for secure API key storage
- **External Access**: Full CORS support for iframe embedding and external domain access
- **Cross-Origin Security**: Configured to work seamlessly in MailerLite and other external iframes