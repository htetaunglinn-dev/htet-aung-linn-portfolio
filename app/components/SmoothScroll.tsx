'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenis } from '@/app/lib/smooth-scroll';

const NAV_HEIGHT = 72;

/**
 * Inertia-based smooth scrolling (Lenis). Wheel and trackpad input is eased,
 * so the scroll-linked effects glide instead of stepping. Skipped for
 * reduced-motion users, who keep native scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: -NAV_HEIGHT },
    });
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
