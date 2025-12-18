# Asteroids Game Implementation (Optional Feature)

## Overview

Implement a fully interactive Asteroids game using Three.js that can be launched from the Hero section via a button. The game will open in a modal/overlay dialog, keeping the hero section clean and professional while offering an optional interactive experience to showcase technical skills.

## Architecture

The implementation will use:
- **Three.js** for 3D rendering and game mechanics
- **React client component** for the game canvas (required for browser APIs and interactivity)
- **Modal/Dialog component** (using shadcn/ui) to contain the game
- **Optional launch button** in the Hero section
- **Performance optimizations** including cleanup when modal closes

## Implementation Steps

### 1. Install Dependencies
- Add `three` and `@types/three` to `package.json`
- Three.js will handle 3D rendering, geometry, materials, and scene management
- Ensure shadcn/ui dialog component is available (or install if needed)

### 2. Create Game Component

**New file: `src/components/sections/Hero/AsteroidsGame.tsx`**
- Client component (`'use client'`) for browser APIs
- Three.js scene setup with camera, renderer, and lighting
- Game state management (ship, asteroids, bullets, score, lives)
- Game loop using `requestAnimationFrame`
- Keyboard event handlers (arrow keys for movement, spacebar for shooting)
- Collision detection system
- Asteroid spawning and splitting logic
- Proper cleanup on unmount (dispose geometries, materials, renderer)

**Key game features:**
- Player ship (triangle) that rotates and moves
- Asteroids of varying sizes that split when hit
- Bullets with limited range
- Wrapping screen boundaries
- Score tracking
- Lives system
- Game over and restart functionality
- Pause functionality (ESC key or button)

### 3. Create Game Modal Component

**New file: `src/components/sections/Hero/AsteroidsGameModal.tsx`**
- Wrapper component that combines the Dialog and AsteroidsGame
- Manages modal open/close state
- Handles game initialization when modal opens
- Ensures proper cleanup when modal closes
- Responsive sizing for the game canvas
- Instructions overlay (optional, dismissible)

**Features:**
- Full-screen or large modal dialog
- Close button (X) in top-right corner
- ESC key to close modal
- Click outside to close (optional, may want to disable to prevent accidental closes)
- Game controls instructions displayed initially

### 4. Update Hero Component

**Modify: `src/components/sections/Hero/index.tsx`**
- Add a subtle "Play Asteroids" button or link
- Button should be styled to match existing design system
- Position it appropriately (e.g., below LinkedIn button or as a secondary action)
- Import and use the `AsteroidsGameModal` component
- Keep hero content unchanged and professional

**Button placement options:**
- Below the LinkedIn button as a secondary action
- As a small icon button in a corner
- As text link in the contact info area

### 5. Styling Considerations

- Modal should be full-screen or near full-screen for best game experience
- Game canvas should fill modal content area
- Dark background for the game (space theme)
- Ensure game respects theme (dark/light mode) for UI elements
- Responsive: modal should work on mobile (though game may be challenging on touch)
- Add subtle animations for modal open/close

### 6. Performance Optimizations

- Initialize Three.js only when modal opens (lazy loading)
- Clean up Three.js resources completely when modal closes
- Pause game loop when modal is not visible
- Limit frame rate if needed (target 60fps)
- Debounce resize events for canvas resizing
- Consider reducing asteroid count on mobile devices

### 7. Accessibility

- Modal should be properly accessible (ARIA labels, focus management)
- Keyboard controls for game should not interfere with modal controls
- ESC key closes modal (standard behavior)
- Focus trap within modal when open
- Screen reader announcements for game state changes (optional)
- Instructions should be clear and accessible

### 8. User Experience Enhancements

- Show game instructions on first open (dismissible)
- Display controls: Arrow keys to move, Space to shoot, ESC to pause/close
- High score tracking (localStorage, optional)
- Restart button visible in game
- Pause overlay when game is paused
- Smooth modal transitions

## File Changes Summary

**New files:**
- `src/components/sections/Hero/AsteroidsGame.tsx` - Main game component with Three.js implementation
- `src/components/sections/Hero/AsteroidsGameModal.tsx` - Modal wrapper for the game

**Modified files:**
- `package.json` - Add `three` and `@types/three` dependencies
- `src/components/sections/Hero/index.tsx` - Add launch button and integrate modal

**Potential new files (if shadcn dialog not available):**
- `src/components/ui/dialog.tsx` - Dialog component from shadcn/ui (if not already present)

## Technical Details

**Three.js Setup:**
- Perspective camera with appropriate FOV
- WebGL renderer with antialiasing
- Scene with dark background (space theme)
- Point lights for visibility
- 2D-style game rendered in 3D space (orthographic or perspective with fixed Z)
- Canvas sized to fit modal container

**Game Mechanics:**
- Ship physics: rotation, acceleration, velocity, friction
- Asteroid generation: random positions, sizes, velocities
- Bullet system: spawn from ship, travel forward, despawn after distance/time
- Collision: circle-based collision detection for simplicity
- Wrapping: teleport objects to opposite side when leaving screen bounds
- Particle effects for explosions (optional enhancement)

**State Management:**
- React state for modal open/close
- React state for game state (score, lives, game over, paused)
- Three.js objects stored in refs to avoid re-renders
- Game loop separate from React render cycle
- LocalStorage for high score persistence (optional)

**Modal Integration:**
- Use shadcn/ui Dialog component for consistent styling
- Manage game lifecycle: initialize on open, cleanup on close
- Handle keyboard events properly (game controls vs modal controls)
- Ensure proper z-index and focus management

## Benefits of This Approach

1. **Professional Hero Section**: Main hero remains clean and focused on content
2. **Optional Experience**: Users can choose to engage with the game
3. **No Performance Impact**: Game only loads when requested
4. **Better UX**: Doesn't distract from portfolio content
5. **Showcases Skills**: Still demonstrates Three.js and game development capabilities
6. **Accessible**: Can be easily disabled or skipped by users who don't want it

## Future Enhancements (Optional)

- Add game to Projects section as a portfolio piece
- High score leaderboard (if backend available)
- Different difficulty levels
- Sound effects and music (with mute option)
- Mobile touch controls
- Share score functionality





