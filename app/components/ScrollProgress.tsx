'use client';

import { useEffect, useRef, useState } from 'react';
import { getSectionTrackProgress } from '@/app/lib/scroll-utils';

const SECTIONS = [
  { id: 'home', label: 'Launch' },
  { id: 'about', label: 'Origin' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'experience', label: 'Trajectory' },
  { id: 'projects', label: 'Missions' },
  { id: 'contact', label: 'Transmission' },
];

const ACTIVE_LINE = 0.5;

/**
 * Desktop-only "orbit map" on the right edge: one node per section,
 * a track that fills with scroll, and the current section highlighted.
 */
export default function ScrollProgress() {
  const [active, setActive] = useState('home');
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: `-${(ACTIVE_LINE - 0.05) * 100}% 0px -${(1 - ACTIVE_LINE) * 100}% 0px` }
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const tops = SECTIONS.flatMap(({ id }) => {
        const element = document.getElementById(id);
        return element ? [element.getBoundingClientRect().top] : [];
      });
      const progress = getSectionTrackProgress(tops, window.innerHeight * ACTIVE_LINE);
      fillRef.current?.style.setProperty('--rail-progress', progress.toFixed(4));
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
  }, []);

  return (
    <nav aria-label="Section progress" className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="relative flex flex-col items-end gap-7">
        <div className="absolute right-[5px] top-1 bottom-1 w-px bg-white/10" />
        <div
          ref={fillRef}
          className="absolute right-[5px] top-1 w-px bg-gradient-to-b from-[#5a7dee] to-[#4169E1] origin-top"
          style={{ height: 'calc(100% - 0.5rem)', transform: 'scaleY(var(--rail-progress, 0))' }}
        />
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <a key={id} href={`#${id}`} className="group relative flex items-center gap-3" aria-label={label}>
              <span
                className={`text-[11px] uppercase tracking-[0.25em] transition-all duration-300 ${
                  isActive ? 'text-[#4169E1] opacity-100' : 'text-gray-500 opacity-0 group-hover:opacity-100'
                }`}
              >
                {label}
              </span>
              <span
                className={`relative w-[11px] h-[11px] rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#4169E1] border-[#4169E1] shadow-[0_0_12px_rgba(65,105,225,0.9)] scale-125'
                    : 'bg-black border-white/30 group-hover:border-[#4169E1]'
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
