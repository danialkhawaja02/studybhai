import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Footer Component', () => {
  it('should render Cadmus wine footer with peach text and social links', () => {
    const footerPath = path.resolve(process.cwd(), 'src/components/Footer.astro');
    const content = fs.readFileSync(footerPath, 'utf-8');

    expect(content).toContain('footer-wine');
    expect(content).toContain('support@studybhai.com');
  });
});
