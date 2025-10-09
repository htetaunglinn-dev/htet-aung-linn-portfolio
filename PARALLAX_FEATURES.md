# Parallax Scroll Effects

Your portfolio now includes multiple parallax scroll effects to create depth and make the website feel alive!

## Features Implemented

### 1. **Scroll-Based Parallax**
- Background layers move at different speeds as you scroll
- Creates depth perception with multiple layers
- Smooth transitions between sections

### 2. **Mouse Movement Parallax**
- Elements respond to mouse position
- Geometric patterns follow cursor movement
- Creates an interactive, responsive feel

### 3. **3D Tilt Cards (Project Cards)**
- Project cards tilt based on mouse position
- Perspective transformation for 3D effect
- Hover interactions with depth

### 4. **Layered Depth Effects**
- Floating stat cards with different parallax speeds
- Glowing orbs that move independently
- Multiple depth layers in hero section

## Components Created

### `useParallax` Hook
Custom hook for scroll-based parallax effects with configurable speed.

```tsx
const parallax = useParallax(0.5); // 0.5 = half scroll speed
```

### `useMouseParallax` Hook
Tracks mouse movement for interactive parallax effects.

```tsx
const mouseParallax = useMouseParallax(0.02); // sensitivity
```

### `ParallaxCard` Component
Reusable card component with 3D tilt effect on hover.

```tsx
<ParallaxCard intensity={10}>
  {/* Your content */}
</ParallaxCard>
```

### `ParallaxSection` Component
Wrapper for sections with parallax scrolling.

```tsx
<ParallaxSection speed={0.5}>
  {/* Section content */}
</ParallaxSection>
```

## Performance Optimization

- Uses `will-change` CSS property
- `backface-visibility: hidden` for GPU acceleration
- Passive scroll listeners
- Optimized transform calculations

## Customization

You can adjust parallax intensity by modifying:
- Speed values in `useParallax()` calls
- Sensitivity in `useMouseParallax()`
- Intensity prop in `ParallaxCard` components

## Browser Support

Works in all modern browsers with hardware acceleration support.
