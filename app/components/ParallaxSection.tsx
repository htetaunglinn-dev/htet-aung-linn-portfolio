'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  id?: string;
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
  id
}: ParallaxSectionProps) {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

          if (scrollPercent >= 0 && scrollPercent <= 1) {
            setOffset(scrollPercent * 100 * speed);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${className} parallax-layer`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </section>
  );
}
