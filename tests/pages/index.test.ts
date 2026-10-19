import { describe, it, expect } from 'vitest';
import { getAllPosts } from '@/lib/wordpress';

describe('Home Page Data', () => {
  it('should fetch latest educational resources for home page sections', async () => {
    const posts = await getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    const notes = posts.filter(p => p.categories.includes('notes') || p.categories.includes('12th-class-notes'));
    expect(notes.length).toBeGreaterThan(0);
  });
});
