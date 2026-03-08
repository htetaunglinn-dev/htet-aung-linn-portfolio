/**
 * Ease-out cubic easing: 1 - (1 - progress)^3
 * Starts fast and decelerates toward the end.
 */
export function easeOutCubic(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}
