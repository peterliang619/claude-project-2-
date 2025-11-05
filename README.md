# Minimalist Interactive Experience

A minimalist webpage featuring multiple interactive choices and smooth micro-interactions.

## Features

### Multiple Choice Points (4+ Choices Each)
- **Primary Choices (4 options):**
  - Nature: Embrace tranquility
  - Technology: Seek innovation
  - Art: Create beauty
  - Zen: Find balance

- **Secondary Choices (4 options):**
  - Minimal: Less is more
  - Vibrant: Full of energy
  - Calm: Peaceful approach
  - Bold: Make a statement

### Interactive Elements
- **Custom Cursor**: Circle with center dot that expands on hover over interactive elements
- Card-based hover interactions with scale and background transforms
- List-based selections with smooth transitions
- Progress bar indicating journey completion
- Navigation dots for visual feedback
- Dynamic color theming based on selections

### Micro-Interactions
- **Custom Cursor Animations**:
  - Smooth follow effect with easing (circle follows with delay, dot is instant)
  - Expands to 70px when hovering over interactive elements
  - Contracts on click for tactile feedback
  - Adapts color based on selected theme
- Fade-in animations on load
- Pulse animations on buttons
- Slide-in animations for list items
- Hover effects with color inversions
- Mouse trail effects (subtle particle trail)
- Typewriter effect for result text
- Ripple effects on button clicks
- Smooth screen transitions
- Scale animations on interactions
- Keyboard navigation support (ESC to reset, 1-4 for quick selection)

### Design Principles
- Clean typography with proper hierarchy
- Limited color palette (black, white, accent colors)
- Generous white space
- Smooth transitions (0.3s-0.5s)
- Responsive design for all screen sizes
- Accessibility considerations

## Usage

Simply open `index.html` in a web browser to experience the interactive journey.

### Keyboard Shortcuts
- **ESC**: Reset to start screen
- **1-4**: Quick selection on the secondary choice screen

## Technical Details

- Pure HTML, CSS, and JavaScript (no dependencies)
- CSS Grid for responsive layouts
- CSS custom properties for theming
- Smooth animations using CSS transitions and keyframes
- JavaScript for state management and interactions
- Custom cursor implementation with:
  - `requestAnimationFrame` for smooth 60fps animation
  - Easing algorithm for follow effect
  - MutationObserver for dynamic element detection
  - Automatic fallback to default cursor on touch devices

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge)
