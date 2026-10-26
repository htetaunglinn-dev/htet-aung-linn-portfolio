import { describe, it, expect } from 'vitest';
import { getScrollProgress, getScrollTarget, getSectionTrackProgress } from './scroll-utils';

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

describe('getScrollProgress', () => {
  const VH = 800;

  it('exit: tracks how far the element has scrolled out the top', () => {
    expect(getScrollProgress(0, 1000, VH, 'exit')).toBe(0);
    expect(getScrollProgress(-500, 1000, VH, 'exit')).toBe(0.5);
    expect(getScrollProgress(-2000, 1000, VH, 'exit')).toBe(1);
    expect(getScrollProgress(300, 1000, VH, 'exit')).toBe(0);
  });

  it('through: spans entering at the bottom to leaving at the top', () => {
    expect(getScrollProgress(VH, 400, VH, 'through')).toBe(0);
    expect(getScrollProgress(-400, 400, VH, 'through')).toBe(1);
    expect(getScrollProgress(200, 400, VH, 'through')).toBe(0.5);
  });

  it('center: spans the element passing mid-viewport', () => {
    expect(getScrollProgress(400, 1000, VH, 'center')).toBe(0);
    expect(getScrollProgress(-100, 1000, VH, 'center')).toBe(0.5);
    expect(getScrollProgress(-1000, 1000, VH, 'center')).toBe(1);
  });

  it('returns 0 for zero-height elements instead of NaN', () => {
    expect(getScrollProgress(-10, 0, VH, 'exit')).toBe(0);
    expect(getScrollProgress(-10, 0, VH, 'center')).toBe(0);
  });
});

describe('getSectionTrackProgress', () => {
  const LINE = 400;
  const UNEVEN_TOPS = [0, 1000, 1200, 4000];

  it('reaches each node exactly when its section top crosses the line', () => {
    expect(getSectionTrackProgress(UNEVEN_TOPS.map((top) => top + LINE), LINE)).toBe(0);
    expect(getSectionTrackProgress(UNEVEN_TOPS.map((top) => top - 1000 + LINE), LINE)).toBeCloseTo(1 / 3);
    expect(getSectionTrackProgress(UNEVEN_TOPS.map((top) => top - 1200 + LINE), LINE)).toBeCloseTo(2 / 3);
    expect(getSectionTrackProgress(UNEVEN_TOPS.map((top) => top - 4000 + LINE), LINE)).toBe(1);
  });

  it('interpolates within a section by its own height', () => {
    expect(getSectionTrackProgress(UNEVEN_TOPS.map((top) => top - 500 + LINE), LINE)).toBeCloseTo(1 / 6);
    expect(getSectionTrackProgress(UNEVEN_TOPS.map((top) => top - 1100 + LINE), LINE)).toBeCloseTo(1 / 2);
  });

  it('clamps before the first and after the last section', () => {
    expect(getSectionTrackProgress(UNEVEN_TOPS.map((top) => top + 100 + LINE), LINE)).toBe(0);
    expect(getSectionTrackProgress(UNEVEN_TOPS.map((top) => top - 9000 + LINE), LINE)).toBe(1);
  });

  it('returns 0 when there is no segment to fill', () => {
    expect(getSectionTrackProgress([], LINE)).toBe(0);
    expect(getSectionTrackProgress([0], LINE)).toBe(0);
  });
});
