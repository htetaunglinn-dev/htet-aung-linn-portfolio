/**
 * Calculates the target scroll position for a section.
 * For 'home', returns 0. For other sections, returns element position minus nav offset.
 */
export function getScrollTarget(
  sectionId: string,
  elementPosition: number,
  navHeight: number
): number {
  if (sectionId === 'home') return 0;
  return elementPosition - navHeight;
}

export type ScrollProgressMode = 'exit' | 'through' | 'center';

/**
 * Maps an element's viewport position to a 0–1 progress value.
 * - 'exit': 0 while the element's top is at/below the viewport top, 1 once it has scrolled fully out the top.
 * - 'through': 0 when the element's top enters at the bottom, 1 when its bottom leaves at the top.
 * - 'center': 0 when the element's top reaches mid-viewport, 1 when its bottom does.
 */
export function getScrollProgress(
  top: number,
  height: number,
  viewportHeight: number,
  mode: ScrollProgressMode
): number {
  let progress: number;
  if (mode === 'exit') {
    progress = height > 0 ? -top / height : 0;
  } else if (mode === 'through') {
    progress = (viewportHeight - top) / (viewportHeight + height);
  } else {
    progress = height > 0 ? (viewportHeight / 2 - top) / height : 0;
  }
  return Math.min(1, Math.max(0, progress));
}

export function getSectionTrackProgress(sectionTops: number[], line: number): number {
  const segments = sectionTops.length - 1;
  if (segments < 1) return 0;
  for (let i = segments - 1; i >= 0; i--) {
    if (sectionTops[i] <= line) {
      const span = sectionTops[i + 1] - sectionTops[i];
      const fraction = span > 0 ? Math.min(1, (line - sectionTops[i]) / span) : 1;
      return (i + fraction) / segments;
    }
  }
  return 0;
}
