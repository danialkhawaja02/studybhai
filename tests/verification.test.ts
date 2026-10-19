import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { getAllPosts, getCategories } from '@/lib/wordpress';
import { NAV_ITEMS } from '@/lib/navigation';
import { SITE_METADATA } from '@/lib/constants';

describe('Full Site Verification', () => {
  it('should have all navigation links, categories, and posts operational', async () => {
    const posts = await getAllPosts();
    const categories = await getCategories();
    expect(posts.length).toBeGreaterThan(0);
    expect(categories.length).toBeGreaterThan(0);
    expect(NAV_ITEMS.length).toBeGreaterThan(0);
  });

  it('should have complete site metadata for SEO and branding', () => {
    expect(SITE_METADATA.title).toContain('Study Bhai');
    expect(SITE_METADATA.canonicalUrl).toBe('https://studybhai.com');
    expect(SITE_METADATA.stats.subjects).toBe('15+');
    expect(SITE_METADATA.stats.students).toBe('500K+');
  });

  it('should verify all core categories have valid slugs', async () => {
    const categories = await getCategories();
    const slugs = categories.map(c => c.slug);
    expect(slugs).toContain('ptb-books');
    expect(slugs).toContain('notes');
    expect(slugs).toContain('past-papers');
  });

  it('should verify global CSS defines full Cadmus palette and typography', () => {
    const cssPath = path.resolve(process.cwd(), 'src/styles/global.css');
    const css = fs.readFileSync(cssPath, 'utf-8');

    expect(css).toContain('--color-navy: #1e2454;');
    expect(css).toContain('--color-royal: #555de3;');
    expect(css).toContain('--color-wine: #1e2454;');
    expect(css).toContain('--color-wine-dark: #131738;');
    expect(css).toContain('--color-bg-parchment: #ffffff;');
    expect(css).toContain('--color-peach: #555de3;');
    expect(css).toContain('--color-vellum-border: #e2e8f0;');
    expect(css).toContain('STIX Two Text');
    expect(css).toContain('Space Grotesk');
  });

  it('should verify all hub archive headers use official navy gradient', () => {
    const hubFiles = [
      'src/pages/books/index.astro',
      'src/pages/books/[grade].astro',
      'src/pages/notes/index.astro',
      'src/pages/notes/[grade].astro',
      'src/pages/past-papers/index.astro',
      'src/pages/guides/index.astro',
      'src/pages/scholarships/index.astro',
      'src/pages/[slug].astro'
    ];

    for (const file of hubFiles) {
      const filePath = path.resolve(process.cwd(), file);
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toContain('var(--color-wine)');
      expect(content).toContain('var(--color-wine-dark)');
      // Verify obsolete emerald colors are completely gone
      expect(content).not.toContain('#1F2E2B');
      expect(content).not.toContain('#34D399');
    }
  });

  it('should verify header and footer incorporate Cadmus architecture', () => {
    const headerContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/Header.astro'), 'utf-8');
    const footerContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/Footer.astro'), 'utf-8');

    // Floating island pill header
    expect(headerContent).toContain('header-island');
    expect(headerContent).toContain('kbd-badge');
    expect(headerContent).toContain('mobile-nav-drawer');

    // Deep wine footer with peach text
    expect(footerContent).toContain('footer-wine');
    expect(footerContent).toContain('support@studybhai.com');
  });
});
