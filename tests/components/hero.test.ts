import { describe, it, expect } from 'vitest';
import { HERO_STATS, GRADE_FILTERS } from '@/lib/constants';

describe('Hero Data & Constants', () => {
  it('should export correct Study Bhai live metrics', () => {
    expect(HERO_STATS).toEqual([
      { value: '15+', label: 'Subjects Covered' },
      { value: '500K+', label: 'Students' },
      { value: '4', label: 'SDG Goal Focus' },
    ]);
  });

  it('should have 4 high school & intermediate grade filters', () => {
    expect(GRADE_FILTERS.map(g => g.grade)).toEqual(['9', '10', '11', '12']);
  });
});
