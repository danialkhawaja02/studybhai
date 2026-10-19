import { describe, it, expect } from 'vitest';
import { extractHeadingsFromHtml } from '@/lib/content-parser';

describe('Content Parser', () => {
  it('should extract h2 and h3 headings with generated anchor slugs', () => {
    const html = '<h2>Overview</h2><p>text</p><h3>Key Points</h3>';
    const headings = extractHeadingsFromHtml(html);
    expect(headings).toEqual([
      { depth: 2, text: 'Overview', slug: 'overview' },
      { depth: 3, text: 'Key Points', slug: 'key-points' },
    ]);
  });
});
