# Htet Aung Linn Portfolio - Development Guidelines

This document outlines the development strategy and best practices for this Next.js 15 portfolio application.

## Project Overview

**Tech Stack:**

- Next.js 15.5.4 with App Router (Turbopack enabled)
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- React Icons 5.5.0

**Project Type:** Static portfolio website showcasing professional experience, projects, and skills

## 1. Core Architecture

### 1.1 App Router Structure

This portfolio uses Next.js App Router with the following structure:

- `app/page.tsx` - Main page (Client Component with interactive elements)
- `app/layout.tsx` - Root layout with font optimization
- `app/components/` - Reusable UI components

### 1.2 Component Strategy

**Client Components:** This portfolio primarily uses Client Components (`'use client'`) for:

- Interactive animations and parallax effects
- Scroll-based visibility tracking with IntersectionObserver
- State management for UI interactions (contact reveals, navigation)
- Dynamic star field and particle effects

**Rationale:** As a portfolio site with rich animations and interactive elements, client-side rendering provides the best user experience without the complexity of server/client component boundaries.

### 1.3 Build Configuration

- Uses `--turbopack` flag for faster development and production builds
- All pages are statically generated (SSG) since content is fixed
- No external API calls or dynamic data fetching

## 2. Performance Optimization

### 2.1 Font Optimization

**Current Implementation:**

```typescript
import { Inter, Playfair_Display } from "next/font/google";
```

- Uses `next/font/google` for automatic font optimization
- Self-hosts fonts to eliminate external network requests
- Prevents FOUT (Flash of Unstyled Text)

### 2.2 Image Handling

**Requirements:**

- When adding images, ALWAYS use `next/image` component
- Specify explicit `width` and `height` to prevent CLS
- Use appropriate `priority` prop for above-the-fold images
- Leverage automatic WebP/AVIF conversion

**Example:**

```typescript
import Image from "next/image";

<Image
  src="/profile.jpg"
  alt="Profile"
  width={400}
  height={400}
  priority={true}
/>;
```

### 2.3 Animation Performance

- All animations use CSS transforms and opacity for GPU acceleration
- Particle effects and starfields are generated client-side to avoid hydration mismatches
- Uses `transform: translateZ(0)` to create stacking contexts and improve rendering

### 2.4 Bundle Optimization

- React Icons used selectively (import only needed icons)
- No external dependencies beyond essential libraries
- Tailwind CSS purges unused styles in production

## 3. Design System & UI Guidelines

### 3.1 Color Palette

**Primary Colors:**

- Royal Blue: `#4169E1` - Primary brand color
- Variants: `#5a7dee`, `#3454b4` for hover states
- Backgrounds: Black (`#000000`), `#0a0a0a`
- Text: White, gray-400, gray-500

**Usage:**

- Use `[#4169E1]` for primary actions and accents
- Maintain dark theme consistency
- Apply opacity variants (`/10`, `/20`, `/30`) for subtle effects

### 3.2 Responsive Design

**Breakpoints (Tailwind defaults):**

- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up

**Mobile-First Approach:**

- Design for mobile viewport first
- Use responsive utilities to enhance for larger screens
- Hide complex visual effects on mobile (e.g., `hidden lg:block` for floating cards)

### 3.3 Spacing & Layout

- Max content width: `max-w-5xl` or `max-w-6xl`
- Section padding: `py-40` on desktop, adjust for mobile
- Consistent use of `px-6` for horizontal padding
- Use `backdrop-blur-sm` or `backdrop-blur-md` for glassmorphism

### 3.4 Typography

**Font Families:**

- Inter (Sans-serif) - Body text, UI elements
- Playfair Display (Serif) - Available for headings if needed

**Hierarchy:**

- Hero: `text-5xl md:text-6xl lg:text-8xl`
- Section titles: `text-4xl md:text-6xl`
- Body: `text-lg` to `text-xl`
- Captions: `text-sm` or `text-xs`

## 4. Component Patterns

### 4.1 Existing Components

**Navigation:** Fixed position navigation with smooth scroll
**FloatingParticles:** Ambient particle animation effect
**ParallaxCard:** Card with 3D tilt effect on mouse move
**WorkExperience:** Timeline-style work history display
**TechStackCarousel:** Horizontal scrolling tech stack showcase
**SecureExternalLink:** Safe external links with `rel="noopener noreferrer"`

### 4.2 Interaction Patterns

**Hover States:**

```css
hover:border-[#4169E1]/30 transition-all duration-300 hover:scale-105
```

**Focus States:** Always include focus indicators for accessibility

```css
focus:ring-2 focus:ring-[#4169E1] focus:outline-none
```

**Transitions:** Use consistent timing

- Quick interactions: `duration-200` or `duration-300`
- Complex animations: `duration-500` to `duration-1000`

### 4.3 Scroll Animations

Current implementation uses IntersectionObserver for scroll-triggered animations:

```typescript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
      }
    });
  },
  { threshold: 0.1 }
);
```

Apply animations with:

```css
transition-all duration-1000 $ {
  isvisible.section? 'opacity-100 translate-y-0' : "opacity-0 translate-y-10";
}
```

## 5. Accessibility Requirements

### 5.1 Semantic HTML

- Use proper heading hierarchy (h1 → h2 → h3)
- Use `<section>` with `id` attributes for navigation targets
- Use `<nav>` for navigation menus
- Provide `alt` text for all images

### 5.2 Interactive Elements

- Ensure all clickable elements are keyboard accessible
- Provide `aria-label` for icon-only buttons
- Use proper `<button>` vs `<a>` tags (buttons for actions, links for navigation)
- Maintain color contrast ratios (WCAG AA minimum)

### 5.3 Motion Considerations

- Complex animations are decorative and don't block content access
- Consider adding `prefers-reduced-motion` media query for users sensitive to motion

## 6. Security Practices

### 6.1 External Links

**Always use SecureExternalLink component or manual attributes:**

```typescript
<a
  href="https://external.com"
  target="_blank"
  rel="noopener noreferrer"
>
```

### 6.2 Environment Variables

- No sensitive data in this static portfolio
- If adding analytics or external services, use `NEXT_PUBLIC_` prefix only for client-safe values
- Store API keys in `.env.local` (never commit to git)

### 6.3 Content Security

- Validate and sanitize any user input if adding contact forms
- Use HTTPS for all external resources
- No inline scripts or eval() usage

## 7. Development Workflow

### 7.1 Commands

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production with Turbopack
npm run start    # Start production server
npm run lint     # Run ESLint
```

### 7.2 Code Style

- Use TypeScript for type safety
- Follow ESLint configuration (Next.js recommended)
- Use functional components with hooks
- Prefer `const` over `let`, avoid `var`
- Use template literals for string interpolation

### 7.3 Git Workflow

Current branch: `main`

- Write clear, descriptive commit messages
- Test builds before committing
- Keep commits focused on single features/fixes

## 8. Content Management

### 8.1 Portfolio Content

**Work Experience:** Update in `WorkExperience.tsx`
**Projects:** Update project array in `app/page.tsx` (lines 349-385)
**Skills:** Update skills array in `app/page.tsx` (lines 290-317)
**Contact Info:** Update contact details in `app/page.tsx` (lines 459-483)

### 8.2 SEO Metadata

Update in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Htet Aung Linn | Portfolio",
  description: "Professional portfolio showcasing...",
};
```

### 8.3 Adding New Sections

When adding new sections:

1. Add `id` attribute to `<section>` for navigation
2. Add to Navigation component links
3. Include IntersectionObserver tracking for scroll animations
4. Follow existing spacing patterns (`py-40 px-6`)
5. Add lighting effects and gradients for visual consistency

## 9. Testing & Quality Assurance

### 9.1 Pre-Deployment Checklist

- [ ] Run `npm run build` to verify production build succeeds
- [ ] Test all navigation links work correctly
- [ ] Verify all external links open in new tabs with proper security attributes
- [ ] Check responsive design on mobile, tablet, and desktop viewports
- [ ] Test animations and interactions across different browsers
- [ ] Validate accessibility with keyboard navigation
- [ ] Check for console errors or warnings
- [ ] Verify meta tags and SEO information

### 9.2 Browser Support

Target modern browsers with ES6+ support:

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

## 10. Future Enhancements

Consider implementing:

- Blog section with MDX support
- Project case studies with detailed pages
- Contact form with Server Actions
- Dark/light theme toggle (currently dark-only)
- Analytics integration (Google Analytics, Plausible, etc.)
- CMS integration for easier content updates
