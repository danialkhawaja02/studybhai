import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Cadmus Design System Tokens', () => {
  it('should define all core Cadmus color tokens and typography variables in global.css', () => {
    const cssPath = path.resolve(process.cwd(), 'src/styles/global.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Color tokens
    expect(cssContent).toContain('--color-wine: #580c1d');
    expect(cssContent).toContain('--color-bg-parchment: #fcf7ef');
    expect(cssContent).toContain('--color-peach: #ffc8ae');
    expect(cssContent).toContain('--color-vellum-border: #cfc0b0');
    expect(cssContent).toContain('--color-tag-blue: #b6dbff');
    expect(cssContent).toContain('--color-tag-green: #d1e375');
    expect(cssContent).toContain('--color-tag-pink: #ffc3f0');

    // Font imports & utilities
    expect(cssContent).toContain('STIX+Two+Text');
    expect(cssContent).toContain('.italic-serif');
  });
});
