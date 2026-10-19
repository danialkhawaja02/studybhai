import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Header Component', () => {
  it('should render floating island container and Cadmus navigation structure', () => {
    const headerPath = path.resolve(process.cwd(), 'src/components/Header.astro');
    const content = fs.readFileSync(headerPath, 'utf-8');

    // Floating island pill class
    expect(content).toContain('header-island');
    // Core de-congested navigation links
    expect(content).toContain("href: '/books/'");
    expect(content).toContain("href: '/notes/'");
    expect(content).toContain("href: '/past-papers/'");
    expect(content).toContain("href: '/scholarships/'");
    // Search trigger button
    expect(content).toContain('data-open-search');
  });

  it('should have mobile drawer toggle with accessible controls', () => {
    const headerPath = path.resolve(process.cwd(), 'src/components/Header.astro');
    const content = fs.readFileSync(headerPath, 'utf-8');

    expect(content).toContain('mobile-menu-btn');
    expect(content).toContain('mobile-nav-drawer');
  });
});
