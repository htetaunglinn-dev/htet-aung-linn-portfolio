'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'home', label: 'Launch' },
  { id: 'about', label: 'Origin' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'experience', label: 'Trajectory' },
  { id: 'projects', label: 'Missions' },
  { id: 'contact', label: 'Transmission' },
];

/**
 * Desktop-only "orbit map" on the right edge: one node per section,
 * a track that fills with scroll, and the current section highlighted.
 */
export default function ScrollProgress() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Section progress" className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="relative flex flex-col items-end gap-7">
        <div className="absolute right-[5px] top-1 bottom-1 w-px bg-white/10" />
        <div
          data-page-progress
          className="absolute right-[5px] top-1 w-px bg-gradient-to-b from-[#5a7dee] to-[#4169E1] origin-top"
          style={{ height: 'calc(100% - 0.5rem)', transform: 'scaleY(var(--page-progress, 0))' }}
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
