import { describe, it, expect } from 'vitest';
import { easeOutCubic } from './easing';

describe('easeOutCubic', () => {
  it('returns 0 when progress is 0', () => {
    expect(easeOutCubic(0)).toBe(0);
  });

  it('returns 1 when progress is 1', () => {
    expect(easeOutCubic(1)).toBe(1);
  });

  it('returns ~0.875 for progress 0.5 (ease-out: faster at start)', () => {
    const result = easeOutCubic(0.5);
    expect(result).toBeCloseTo(0.875, 3);
  });

  it('returns values between 0 and 1 for progress in (0, 1)', () => {
    expect(easeOutCubic(0.25)).toBeGreaterThan(0);
    expect(easeOutCubic(0.25)).toBeLessThan(1);
    expect(easeOutCubic(0.75)).toBeGreaterThan(0);
    expect(easeOutCubic(0.75)).toBeLessThan(1);
  });

  it('is monotonically increasing', () => {
    const values = [0, 0.2, 0.4, 0.6, 0.8, 1].map(easeOutCubic);
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
  });
});
