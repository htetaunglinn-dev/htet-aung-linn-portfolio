'use client';

import { useEffect, useState } from 'react';
import { easeOutCubic } from '@/app/lib/easing';

export function useCountUp(target: number, duration: number = 1800, delay: number = 400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        setCount(Math.round(eased * target));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return count;
}
