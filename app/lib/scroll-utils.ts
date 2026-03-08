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
