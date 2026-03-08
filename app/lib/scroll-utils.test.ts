import { describe, it, expect } from 'vitest';
import { getScrollTarget } from './scroll-utils';

const NAV_HEIGHT = 72;

describe('getScrollTarget', () => {
  it('returns 0 for home section', () => {
    expect(getScrollTarget('home', 500, NAV_HEIGHT)).toBe(0);
    expect(getScrollTarget('home', 0, NAV_HEIGHT)).toBe(0);
  });

  it('returns element position minus nav height for non-home sections', () => {
    expect(getScrollTarget('about', 500, NAV_HEIGHT)).toBe(428);
    expect(getScrollTarget('experience', 1200, NAV_HEIGHT)).toBe(1128);
  });

  it('handles element at top of page', () => {
    expect(getScrollTarget('about', 72, NAV_HEIGHT)).toBe(0);
  });

  it('handles different nav heights', () => {
    expect(getScrollTarget('projects', 1000, 80)).toBe(920);
    expect(getScrollTarget('projects', 1000, 0)).toBe(1000);
  });
});
