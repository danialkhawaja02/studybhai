import { describe, it, expect } from 'vitest';
import { getAllPosts, getPostBySlug, getCategories } from '@/lib/wordpress';

describe('WordPress API Client', () => {
  it('should return mock posts when API fetch fails or is in dev fallback mode', async () => {
    const posts = await getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('slug');
    expect(posts[0]).toHaveProperty('content');
  });

  it('should find a post by slug', async () => {
    const post = await getPostBySlug('class-12-math-notes');
    expect(post).not.toBeNull();
    expect(post?.slug).toBe('class-12-math-notes');
  });

  it('should return categories including ptb-books and notes', async () => {
    const categories = await getCategories();
    expect(categories.some(c => c.slug === 'ptb-books')).toBe(true);
    expect(categories.some(c => c.slug === 'notes')).toBe(true);
  });
});
