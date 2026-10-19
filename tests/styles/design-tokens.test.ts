import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Cadmus Design System Tokens', () => {
  it('should define all core Cadmus color tokens and typography variables in global.css', () => {
    const cssPath = path.resolve(process.cwd(), 'src/styles/global.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Color tokens
    expect(cssContent).toContain('--color-navy: #1e2454');
    expect(cssContent).toContain('--color-royal: #555de3');
    expect(cssContent).toContain('--color-wine: #1e2454');
    expect(cssContent).toContain('--color-bg-parchment: #ffffff');
    expect(cssContent).toContain('--color-peach: #555de3');
    expect(cssContent).toContain('--color-vellum-border: #e2e8f0');
    expect(cssContent).toContain('--color-tag-blue: #e0f2fe');
    expect(cssContent).toContain('--color-tag-green: #dcfce7');
    expect(cssContent).toContain('--color-tag-pink: #eef0fd');

    // Font imports & utilities
    expect(cssContent).toContain('STIX+Two+Text');
    expect(cssContent).toContain('.italic-serif');
  });
});
