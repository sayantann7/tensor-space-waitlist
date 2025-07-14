# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based waitlist application for "Tensor Space" - a naming contest web app where users can submit name suggestions and vote on them. The app is built with Vite, TypeScript, React, and uses shadcn/ui components with Tailwind CSS.

## Development Commands

- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production 
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Architecture

### Frontend Structure
- **React Router** for navigation between contest flow pages
- **TanStack Query** for API state management
- **Framer Motion** for animations
- **shadcn/ui** for UI components
- **Tailwind CSS** for styling with custom fonts and animations

### Key Pages Flow
1. `/` - Landing page with hero section, video demo, and prizes
2. `/name` - Name submission form
3. `/email` - Email collection form  
4. `/instagram` - Instagram username form
5. `/confirmation` - Success page after submission
6. `/leaderboard` - Voting interface with search and ranking
7. `/poster` - Poster generation page
8. `/voting` - Alternative voting interface
9. `/users/:id` - User profile page

### API Integration
- Backend API at `https://api.tensorboy.com`
- Key endpoints in `src/lib/utils.ts`:
  - `checkSubscriber(email)` - Check if email exists
  - `addToWaitlist(email, ig_username, name)` - Add contestant
  - `leaderboard()` - Get all contestants with votes
  - `addVote(email, contestant)` - Submit vote
  - `getContestant(contestantId)` - Get single contestant

### Custom Fonts
- **Satoshi** - Primary font family
- **Coolvetica** - Display font for headings
- **TheSeasons** - Special accent font
- **Ivalencia** - Italic decorative font

### Styling System
- Custom Tailwind config with brand colors and animations
- Gradient backgrounds with orange/yellow theme
- Custom keyframes for glow and float effects
- Responsive design with mobile-first approach

## Key Implementation Details

### State Management
- Uses `localStorage` for persisting user data (email, Instagram username)
- React Query for server state caching
- Local state for UI interactions and form handling

### Video Component
- Custom video player with play/pause controls
- Intersection Observer for auto-pause when not in view
- Mute/unmute functionality

### Voting System
- Users get limited votes (tracked in state)
- Real-time leaderboard updates after voting
- Search functionality for finding contestants

## Development Notes

- TypeScript is configured with relaxed settings (`noImplicitAny: false`)
- Uses absolute imports with `@/` prefix for src directory
- Vite dev server runs on `::` (all interfaces) port 8080
- Lovable tagger plugin for development mode component tagging