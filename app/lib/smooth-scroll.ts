import type Lenis from 'lenis';

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Smoothly scrolls to a page offset, through Lenis when it is running. */
export function smoothScrollTo(top: number) {
  if (lenis) {
    lenis.scrollTo(top);
  } else {
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/** Pauses page scrolling (e.g. while the mobile menu is open). */
export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
