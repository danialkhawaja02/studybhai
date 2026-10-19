import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('ResourceCard Component', () => {
  it('should render vellum card container with pastel subject badge', () => {
    const cardPath = path.resolve(process.cwd(), 'src/components/ResourceCard.astro');
    const content = fs.readFileSync(cardPath, 'utf-8');

    expect(content).toContain('cadmus-card');
    expect(content).toContain('subject-badge');
  });

  it('should include hover micro-interaction transitions', () => {
    const cardPath = path.resolve(process.cwd(), 'src/components/ResourceCard.astro');
    const content = fs.readFileSync(cardPath, 'utf-8');

    expect(content).toContain('transition:');
    expect(content).toContain('box-shadow:');
  });
});
