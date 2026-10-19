import { describe, it, expect } from 'vitest';
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
});
