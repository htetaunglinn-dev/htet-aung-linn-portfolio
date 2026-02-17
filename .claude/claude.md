# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev      # Dev server with Turbopack
npm run build    # Production build with Turbopack
npm run start    # Start production server
npm run lint     # ESLint (flat config, next/core-web-vitals + next/typescript)
```

No test framework is configured. Verify changes with `npm run build`.

## Architecture

**Stack:** Next.js 15 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS 4, React Icons

**Single-page portfolio site** — all content lives in one route (`app/page.tsx`) which is a Client Component (`'use client'`). There are no API routes or server-side data fetching.

### Key files

- `app/page.tsx` — Main page: hero, projects, skills, contact sections. Manages scroll visibility via IntersectionObserver and star field generation client-side
- `app/layout.tsx` — Root layout with SEO metadata, JSON-LD structured data, Google font optimization (Inter + Playfair Display)
- `app/project-data.const.ts` — Project data extracted as a constant
- `app/sitemap.ts` — Sitemap generation
- `app/components/` — All UI components (Navigation, FloatingParticles, ParallaxCard, ParallaxSection, WorkExperience, WorkExperienceCard, TechStackCarousel, SecureExternalLink, WireframeGlobe)
- `app/hooks/useParallax.ts` — Shared parallax scroll hook
- `next.config.ts` — Allows remote images from `res.cloudinary.com/htetaunglinn-dev`

### Component patterns

- All components are Client Components with `'use client'`
- Scroll animations use IntersectionObserver with `threshold: 0.1`, tracked via `isVisible` state map
- External links must use `SecureExternalLink` component or `rel="noopener noreferrer"` manually
- Images must use `next/image` with explicit width/height

## Design System

- **Primary color:** Royal Blue `#4169E1` (hover variants: `#5a7dee`, `#3454b4`)
- **Background:** Black `#000000` / `#0a0a0a`
- **Dark theme only** — all design assumes dark background with white/gray text
- **Glassmorphism:** `backdrop-blur-sm` / `backdrop-blur-md` with opacity borders
- **Section spacing:** `py-40 px-6` with `max-w-5xl` or `max-w-6xl` containers
- **Mobile-first** responsive approach; hide complex visuals on small screens (`hidden lg:block`)

## Adding New Sections

1. Add `<section id="section-name">` with `py-40 px-6` spacing
2. Register the section ID in the IntersectionObserver in `app/page.tsx`
3. Add navigation link in `Navigation.tsx`
4. Use the `isVisible` pattern for scroll-triggered fade-in animations
