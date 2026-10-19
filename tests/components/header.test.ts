import { describe, it, expect } from 'vitest';
import { NAV_ITEMS } from '@/lib/navigation';

describe('Navigation Items', () => {
  it('should contain all essential Study Bhai educational links', () => {
    const labels = NAV_ITEMS.map(i => i.label);
    expect(labels).toContain('Home');
    expect(labels).toContain('Books');
    expect(labels).toContain('Notes');
    expect(labels).toContain('Past Papers');
    expect(labels).toContain('Student Guides');
    expect(labels).toContain('Scholarships');
  });

  it('Books dropdown should contain Class 9 through 12 links', () => {
    const books = NAV_ITEMS.find(i => i.label === 'Books');
    expect(books?.children?.length).toBe(4);
    expect(books?.children?.map(c => c.label)).toContain('9th Class Books');
  });
});
