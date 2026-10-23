'use client';

import { useEffect, useRef } from 'react';
import { getScrollProgress, ScrollProgressMode } from '@/app/lib/scroll-utils';

/**
 * Writes the element's scroll progress (0–1) to a `--progress` CSS variable.
 * Styles read it with calc(), so scroll-linked motion never re-renders React.
 */
export function useScrollProgress<T extends HTMLElement>(mode: ScrollProgressMode = 'through') {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const progress = getScrollProgress(rect.top, rect.height, window.innerHeight, mode);
      element.style.setProperty('--progress', progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      cancelAnimationFrame(frame);
    };
  }, [mode]);

  return ref;
}
