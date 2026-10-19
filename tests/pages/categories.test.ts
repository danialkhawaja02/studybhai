import { describe, it, expect } from 'vitest';
import { getGradeStaticPaths } from '@/lib/resource-utils';

describe('Grade Static Paths', () => {
  it('should return static paths for grades 9, 10, 11, and 12', () => {
    const paths = getGradeStaticPaths();
    expect(paths.map(p => p.params.grade)).toEqual(['class-9', 'class-10', 'class-11', 'class-12']);
  });
});
