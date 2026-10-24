'use client';

import { useState, useEffect } from 'react';
import { getScrollTarget } from '@/app/lib/scroll-utils';
import { setScrollLocked, smoothScrollTo } from '@/app/lib/smooth-scroll';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const SECTIONS = ['home', ...NAV_ITEMS.map((item) => item.id)];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          const scrollPosition = window.scrollY + 100;

          for (const section of SECTIONS) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setScrollLocked(isMenuOpen);
    if (!isMenuOpen) return;

    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      setScrollLocked(false);
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    // Unlock right away: the menu's effect only runs after this scroll has started.
    setScrollLocked(false);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 72; // Fixed nav height offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const target = getScrollTarget(sectionId, elementPosition, navHeight);
      smoothScrollTo(target);
    }
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ${
          isScrolled ? 'top-3' : 'top-5'
        }`}
      >
        <div
          className={`relative w-full flex items-center justify-between gap-6 rounded-full border transition-all duration-500 ${
            isScrolled
              ? 'max-w-4xl pl-5 pr-2 py-2 bg-black/55 border-[#4169E1]/25 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(65,105,225,0.15)]'
              : 'max-w-6xl pl-6 pr-2.5 py-2.5 bg-white/[0.02] border-white/10 backdrop-blur-sm'
          }`}
        >
          {/* Brand: name set as a wordmark */}
          <button
            onClick={() => scrollToSection('home')}
            className="group shrink-0 cursor-pointer"
            aria-label="Back to top"
          >
            <span className="font-logo text-base md:text-lg font-extrabold uppercase tracking-[0.04em] bg-gradient-to-r from-[#5a7dee] to-[#4169E1] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(65,105,225,0.45)] group-hover:from-[#4169E1] group-hover:to-[#5a7dee] transition-colors">
              Htet Aung Linn
            </span>
          </button>

          {/* Desktop links with a glowing pill under the active one */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-full bg-[#4169E1]/15 border border-[#4169E1]/40 shadow-[0_0_18px_rgba(65,105,225,0.35)] transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                  />
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-[#4169E1] hover:bg-[#3454b4] text-white rounded-full transition-all duration-300 hover:scale-105 text-sm font-semibold cursor-pointer shadow-[0_0_20px_rgba(65,105,225,0.45)]"
            >
              Get in Touch
              <span aria-hidden="true">→</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="md:hidden relative w-10 h-10 rounded-full border border-[#4169E1]/30 bg-[#4169E1]/10 flex items-center justify-center cursor-pointer"
            >
              <span
                className={`absolute w-4 h-px bg-white transition-transform duration-300 ${
                  isMenuOpen ? 'rotate-45' : '-translate-y-1'
                }`}
              />
              <span
                className={`absolute w-4 h-px bg-white transition-transform duration-300 ${
                  isMenuOpen ? '-rotate-45' : 'translate-y-1'
                }`}
              />
            </button>
          </div>

          {/* Scroll progress: a beam of light along the capsule's lower edge */}
          <div aria-hidden="true" className="absolute left-6 right-6 -bottom-px h-px overflow-hidden rounded-full">
            <div
              data-page-progress
              className="h-full w-full origin-left bg-gradient-to-r from-transparent via-[#5a7dee] to-[#4169E1] shadow-[0_0_10px_rgba(65,105,225,0.9)]"
              style={{ transform: 'scaleX(var(--page-progress, 0))' }}
            />
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/85 backdrop-blur-xl transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="h-full flex flex-col items-center justify-center gap-2 px-6">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              tabIndex={isMenuOpen ? 0 : -1}
              className={`group flex items-baseline gap-4 py-3 text-4xl font-serif font-bold transition-all duration-500 cursor-pointer ${
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              } ${activeSection === item.id ? 'text-[#5a7dee]' : 'text-white'}`}
              style={{ transitionDelay: isMenuOpen ? `${100 + index * 60}ms` : '0ms' }}
            >
              <span className="text-xs font-sans tracking-[0.3em] text-[#4169E1]">0{index + 1}</span>
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            tabIndex={isMenuOpen ? 0 : -1}
            className={`mt-8 px-8 py-3 bg-[#4169E1] text-white rounded-full font-semibold shadow-[0_0_24px_rgba(65,105,225,0.5)] transition-all duration-500 cursor-pointer ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: isMenuOpen ? '420ms' : '0ms' }}
          >
            Get in Touch →
          </button>
        </div>
      </div>
    </>
  );
}
