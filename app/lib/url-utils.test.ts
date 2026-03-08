import { describe, it, expect } from 'vitest';
import { isValidUrl } from './url-utils';

describe('isValidUrl', () => {
  it('returns true for valid https URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('https://example.com/path')).toBe(true);
    expect(isValidUrl('https://sub.example.com')).toBe(true);
  });

  it('returns true for valid http URLs', () => {
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('http://localhost:3000')).toBe(true);
  });

  it('returns false for javascript: protocol', () => {
    expect(isValidUrl('javascript:alert(1)')).toBe(false);
    expect(isValidUrl('javascript:void(0)')).toBe(false);
  });

  it('returns false for data: protocol', () => {
    expect(isValidUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
  });

  it('returns false for empty or invalid URLs', () => {
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('ftp://example.com')).toBe(false);
    expect(isValidUrl('file:///etc/passwd')).toBe(false);
  });

  it('returns false for malformed URLs', () => {
    expect(isValidUrl('https://')).toBe(false);
    expect(isValidUrl('://example.com')).toBe(false);
  });
});
