import { describe, it, expect } from 'vitest';
import { PROJECTS } from './project-data.const';
import { isValidUrl } from './lib/url-utils';

const REQUIRED_FIELDS = ['title', 'description', 'tags', 'link', 'image'] as const;

describe('PROJECTS', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(PROJECTS)).toBe(true);
    expect(PROJECTS.length).toBeGreaterThan(0);
  });

  it('each project has required fields: title, description, tags, link, image', () => {
    for (const project of PROJECTS) {
      for (const field of REQUIRED_FIELDS) {
        expect(project).toHaveProperty(field);
        expect(project[field]).toBeDefined();
      }
    }
  });

  it('each project has a non-empty title', () => {
    for (const project of PROJECTS) {
      expect(typeof project.title).toBe('string');
      expect(project.title.trim().length).toBeGreaterThan(0);
    }
  });

  it('each project has a non-empty description', () => {
    for (const project of PROJECTS) {
      expect(typeof project.description).toBe('string');
      expect(project.description.trim().length).toBeGreaterThan(0);
    }
  });

  it('each project has tags as a non-empty array of strings', () => {
    for (const project of PROJECTS) {
      expect(Array.isArray(project.tags)).toBe(true);
      expect(project.tags.length).toBeGreaterThan(0);
      for (const tag of project.tags) {
        expect(typeof tag).toBe('string');
        expect(tag.length).toBeGreaterThan(0);
      }
    }
  });

  it('each project link is a valid http/https URL', () => {
    for (const project of PROJECTS) {
      expect(isValidUrl(project.link)).toBe(true);
    }
  });

  it('each project has an image path', () => {
    for (const project of PROJECTS) {
      expect(typeof project.image).toBe('string');
      expect(project.image.length).toBeGreaterThan(0);
    }
  });
});
