import { describe, it, expect } from 'vitest';
import { extractResourceMeta, calculateReadTime } from '@/lib/resource-utils';

describe('Resource Utilities', () => {
  it('should detect subject and grade from title and tags', () => {
    const meta = extractResourceMeta({
      title: 'Class 12 Math Notes – 2nd Year All Chapter Math Notes',
      tags: ['class-12', 'math']
    });
    expect(meta.subject).toBe('Mathematics');
    expect(meta.grade).toBe('12th (2nd Year)');
  });

  it('should calculate estimated read time accurately', () => {
    const time = calculateReadTime('Lorem ipsum '.repeat(200));
    expect(time).toBe('2 min read');
  });
});
