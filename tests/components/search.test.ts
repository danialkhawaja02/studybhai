import { describe, it, expect } from 'vitest';
import { formatSearchSnippet, sanitizeSearchQuery, type SearchResultItem } from '@/lib/search-utils';

describe('Search Utilities', () => {
  it('should format snippet highlights safely', () => {
    const raw = 'Download free <mark>Class 12 Math</mark> notes for examination';
    const clean = formatSearchSnippet(raw);
    expect(clean).toContain('<mark>Class 12 Math</mark>');
  });

  it('should sanitize raw search input to prevent broken queries', () => {
    expect(sanitizeSearchQuery('   physics notes!   ')).toBe('physics notes');
    expect(sanitizeSearchQuery('<script>alert("xss")</script>')).toBe('alertxss');
  });

  it('should truncate snippet to max length without breaking mark tags', () => {
    const raw = 'A '.repeat(50) + '<mark>Class 10</mark> ' + 'B '.repeat(50);
    const snippet = formatSearchSnippet(raw, 60);
    expect(snippet).toContain('<mark>Class 10</mark>');
    expect(snippet.length).toBeLessThanOrEqual(100);
  });
});
