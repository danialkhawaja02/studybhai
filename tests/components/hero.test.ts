import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Hero Component', () => {
  it('should render wine hero container with italic serif headline accent', () => {
    const heroPath = path.resolve(process.cwd(), 'src/components/Hero.astro');
    const content = fs.readFileSync(heroPath, 'utf-8');

    expect(content).toContain('hero-wine-section');
    expect(content).toContain('italic-serif');
    expect(content).toContain('UN SDG 4');
  });

  it('should render interactive 4-card showcase with pastel tags', () => {
    const heroPath = path.resolve(process.cwd(), 'src/components/Hero.astro');
    const content = fs.readFileSync(heroPath, 'utf-8');

    expect(content).toContain('hero-cards-showcase');
    expect(content).toContain('hero-showcase-card');
    expect(content).toContain('hero-metrics-pill');
  });
});
