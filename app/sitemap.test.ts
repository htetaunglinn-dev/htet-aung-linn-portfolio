import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';

const BASE_URL = 'https://htet-aung-linn-portfolio.vercel.app';

describe('sitemap', () => {
  it('returns an array of sitemap entries', () => {
    const result = sitemap();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('each entry has required fields: url, lastModified, changeFrequency, priority', () => {
    const result = sitemap();
    for (const entry of result) {
      expect(entry).toHaveProperty('url');
      expect(entry).toHaveProperty('lastModified');
      expect(entry).toHaveProperty('changeFrequency');
      expect(entry).toHaveProperty('priority');
    }
  });

  it('all URLs use the correct base URL', () => {
    const result = sitemap();
    for (const entry of result) {
      expect(entry.url).toMatch(new RegExp(`^${BASE_URL}`));
    }
  });

  it('includes expected sections: home, about, experience, skills, projects, contact', () => {
    const result = sitemap();
    const urls = result.map((e) => e.url);

    expect(urls).toContain(BASE_URL);
    expect(urls).toContain(`${BASE_URL}/#about`);
    expect(urls).toContain(`${BASE_URL}/#experience`);
    expect(urls).toContain(`${BASE_URL}/#skills`);
    expect(urls).toContain(`${BASE_URL}/#projects`);
    expect(urls).toContain(`${BASE_URL}/#contact`);
  });

  it('lastModified is a valid Date', () => {
    const result = sitemap();
    for (const entry of result) {
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(Number.isNaN(entry.lastModified.getTime())).toBe(false);
    }
  });

  it('priority values are between 0 and 1', () => {
    const result = sitemap();
    for (const entry of result) {
      expect(entry.priority).toBeGreaterThanOrEqual(0);
      expect(entry.priority).toBeLessThanOrEqual(1);
    }
  });

  it('changeFrequency has valid values', () => {
    const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
    const result = sitemap();
    for (const entry of result) {
      expect(validFrequencies).toContain(entry.changeFrequency);
    }
  });
});
