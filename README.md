# React Blog Application

A modern blog application built with React, TypeScript, and Vite featuring infinite scrolling, post filtering, and user authentication.

## Features

- **State Management**: React Query is used for server state management, providing caching, background updates, and request deduplication.
- **Styling**: Emotion is used for CSS-in-JS styling with a custom theme configuration for consistent design tokens.
- **Routing**: The application uses TanStack Router for type-safe routing with nested routes and protected routes.
- **Infinite scrolling**: The application implements infinite scrolling for the posts feed using `useInfiniteQuery` from React Query and a custom `useInfiniteScroll` hook.
- **User Authentication**: User authentication is handled through a login form with form validation using React Hook Form and Zod schema validation.
- **Post Management**: View, filter, and sort blog posts with infinite scrolling
- **Detailed Post View**: View individual posts with comments
- **Responsive Design**: Mobile-friendly interface
- **Tag-based Filtering**: Filter posts by tags
- **WebSocket Chat Module**: Test echo chat
- **GraphQL page**: Page with SW films fetched using GraphQL

## Dependencies

### Core Dependencies
- `react` ^19.2.0 - React library for building user interfaces
- `react-dom` ^19.2.0 - React DOM rendering library
- `@tanstack/react-query` ^5.90.12 - Server state management
- `@tanstack/react-router` ^1.141.2 - Type-safe routing solution
- `@emotion/react` ^11.14.0 - CSS-in-JS styling library
- `@emotion/styled` ^11.14.1 - Styled API for Emotion
- `axios` ^1.13.2 - HTTP client for API requests
- `react-hook-form` ^7.70.0 - Performant, flexible forms with easy validation
- `zod` ^4.3.5 - TypeScript-first schema declaration and validation
- `@hookform/resolvers` ^5.2.2 - Resolvers for react-hook-form
- `emotion-normalize` ^11.0.1 - CSS normalize library for Emotion

### Development Dependencies
- `typescript` ~5.9.3 - TypeScript compiler
- `vite` ^7.2.4 - Next generation frontend tooling
- `@vitejs/plugin-react` ^5.1.1 - React plugin for Vite
- `eslint` ^9.39.1 - JavaScript/TypeScript linter
- `jest` ^30.2.0 - JavaScript testing framework
- `@testing-library/react` ^16.3.1 - React testing utilities
- `@testing-library/jest-dom` ^6.9.1 - Jest DOM testing utilities

## Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SerzhKonserzh/innowise-task-4.git
   ```

2. Navigate to the project directory:
   ```bash
   cd innowise-task-4
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

### Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

### Running Tests

1. Run all tests:
   ```bash
   npm test
   ```

2. Run tests in watch mode:
   ```bash
   npm run test:watch
   ```

## Project Structure

```
src/
├── api/          # API client and service functions
├── components/   # Reusable UI components and pages
├── hooks/        # Custom React hooks
├── routes/       # Application routes
├── theme/        # Theme configuration and global styles
├── types/        # TypeScript type definitions
├── main.tsx      # Application entry point
```

## Deploy: 


