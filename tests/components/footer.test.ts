import { describe, it, expect } from 'vitest';
import { FOOTER_DATA } from '@/lib/constants';

describe('Footer Data', () => {
  it('should contain valid legal links and contact email', () => {
    expect(FOOTER_DATA.email).toBe('support@studybhai.com');
    expect(FOOTER_DATA.legalLinks.map(l => l.label)).toContain('Privacy Policy');
    expect(FOOTER_DATA.legalLinks.map(l => l.label)).toContain('Terms of Services');
  });
});
