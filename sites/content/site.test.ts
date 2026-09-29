import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  caseStudies,
  getAdjacentCaseStudies,
  profile,
  projects,
  services,
} from '@/content/site';

describe('portfolio content contract', () => {
  it('defines exactly eight complete featured case studies with unique slugs', () => {
    expect(caseStudies).toHaveLength(8);
    expect(new Set(caseStudies.map((project) => project.slug)).size).toBe(8);

    for (const project of caseStudies) {
      expect(project.featured).toBe(true);
      expect(project.challenge.length).toBeGreaterThan(80);
      expect(project.role.length).toBeGreaterThan(40);
      expect(project.constraints.length).toBeGreaterThanOrEqual(3);
      expect(project.approach.length).toBeGreaterThanOrEqual(3);
      expect(project.decisions.length).toBeGreaterThanOrEqual(3);
      expect(project.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(project.evidence.length).toBeGreaterThanOrEqual(3);
      expect(project.architecture).toHaveLength(4);
      expect(services.some((service) => service.slug === project.serviceSlug)).toBe(true);
    }
  });

  it('never exposes repository links for private work', () => {
    const privateProjects = projects.filter((project) => project.visibility === 'private');
    expect(privateProjects.length).toBeGreaterThan(0);

    for (const project of privateProjects) {
      expect(project.links.some((link) => link.kind === 'repository')).toBe(false);
    }
  });

  it('keeps external links typed and uses approved protocols', () => {
    for (const project of projects) {
      for (const link of project.links) {
        expect(['repository', 'documentation', 'product', 'email', 'social']).toContain(link.kind);
        expect(link.href).toMatch(/^(https:\/\/|mailto:)/);
      }
    }
  });

  it('uses the approved location and removes the previous location', () => {
    expect(profile.location).toBe('Land O’ Lakes, Florida');
    expect(JSON.stringify({ profile, projects, services })).not.toMatch(/New York/i);
  });

  it('keeps the verified public identity links explicit', () => {
    expect(profile.github).toBe('https://github.com/donaldfilimon');
    expect(profile.alternateGithub).toBe('https://github.com/underswitchx');
    expect(profile.sponsors).toBe('https://github.com/sponsors/donaldfilimon');
    expect(profile.linkedIn).toBe('https://linkedin.com/in/donaldfilimon');
  });

  it('links every case to previous and next cases', () => {
    for (const project of caseStudies) {
      const adjacent = getAdjacentCaseStudies(project.slug);
      expect(adjacent.previous?.slug).not.toBe(project.slug);
      expect(adjacent.next?.slug).not.toBe(project.slug);
    }
  });

  it('honors reduced-motion preferences in the global design system', () => {
    const css = readFileSync(resolve(process.cwd(), 'app/globals.css'), 'utf8');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('animation-duration: .01ms');
  });

  it('keeps interaction and full-bleed layout behavior guideline-safe', () => {
    const css = readFileSync(resolve(process.cwd(), 'app/globals.css'), 'utf8');
    expect(css).toContain('touch-action: manipulation');
    expect(css).toContain('overscroll-behavior: contain');
    expect(css).toContain('safe-area-inset-left');
    expect(css).toContain('text-wrap: balance');
    expect(css).not.toMatch(/transition:\s*all/);
  });
});
