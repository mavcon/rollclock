# Roll Clock

A minimalist countdown timer application built with React, TypeScript, and Tailwind CSS.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Visit `http://localhost:5173`

## Features

- Countdown timer with minutes and seconds
- Rest timer functionality with customizable rest periods
- Preset time buttons (4m-10m) for quick access
- Sound notifications for timer completion
- Responsive design with mobile support
- Interactive time input with arrow controls
- Visual feedback for active states
- Keyboard shortcuts for common actions
- Automatic rest timer transitions
- Clean, minimalist UI design with light/dark theme support
- Carefully crafted color scheme:
  - Light theme: Soft grays for controls and subtle interactions
  - Dark theme: Pure black background with optimized text contrast (80% white for titles, 65% white for controls)
  - Theme toggle with yellow sun and blue moon icons
  - Blue accent color for rest mode

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview build

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- ESLint
- Custom React Hooks for timer and sound management

## Usage

- Click preset buttons for quick timer setup (4-10 minutes)
- Click numbers to manually input time
- Use up/down arrows to adjust time in 1-minute increments
- Toggle rest timer mode for break periods
- Customize rest period duration
- Blue color theme indicates active rest period
- Sound notification plays when timer completes
- Timer automatically transitions to rest period when enabled
- Toggle between light and dark themes with the sun/moon icon

## Component Structure

- `Timer` - Main timer container component
- `TimerDisplay` - Displays current time and handles time input
- `TimerControls` - Contains timer control buttons and rest timer toggle
- `ControlButtons` - Play, pause, and reset controls
- `PresetTimes` - Quick access time preset buttons
- `RestTimeControls` - Rest timer duration controls and toggle

## Custom Hooks

- `useTimer` - Core timer logic and state management
- `useSound` - Sound notification management
