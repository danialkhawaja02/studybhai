# Cadmus-Inspired Visual Re-architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Study Bhai's frontend into an ultra-premium, responsive, animated ed-tech platform matching the award-winning design language, color palette, floating navigation, and typography of Cadmus.io (`https://cadmus.io/`).

**Architecture:** Replace the stark dark-green/white scheme with Cadmus's warm editorial aesthetic: deep academic wine (`#580C1D`), warm parchment cream (`#FCF7EF`), apricot/peach highlights (`#FFE7DB`), floating island header (`header--bar`), interactive 4-card hero showcase with pastel badges, and smooth alternating section rhythms.

**Tech Stack:** Astro 5, Vanilla CSS with custom properties, Google Fonts (`STIX Two Text`, `Inter`, `Space Grotesk`), Vitest, and Pagefind.

**Spec:** `docs/superpowers/specs/2026-10-19-cadmus-redesign-spec.md`

## Global Constraints

- `--color-wine: #580c1d` (primary dark / academic ruby)
- `--color-wine-dark: #3d0714` (hero gradient)
- `--color-bg-parchment: #fcf7ef` (primary page background — warm cream)
- `--color-surface: #fffdfa` (cards, floating header)
- `--color-peach: #ffc8ae` and `--color-peach-light: #ffe7db` (warm highlight)
- `--color-vellum-border: #cfc0b0` (soft dividers and card outlines)
- `--color-text-main: #04191f` (high-contrast text)
- Pastel badge tags: `#ffc3f0` (pink), `#b6dbff` (blue), `#d1e375` (green), `#c5c5ff` (lavender), `#ffe388` (yellow)
- Fonts: `STIX Two Text` for italic serif editorial emphasis, `Inter` for body/UI, `Space Grotesk` for display headings
- Floating Island Header: `max-width: 920px; margin: 20px auto; border-radius: 12px;`
- Desktop breakpoint: `> 990px`; Tablet: `768px – 990px`; Mobile: `< 768px`
- Zero-CLS containment preserved across all ad units and card layouts

## Review Focus

- Header mobile drawer toggle opening and closing without overlapping or clipping
- Contrast ratio between text and background meeting WCAG AA (minimum 4.5:1)
- Infinite marquee ticker animation looping seamlessly without horizontal page scrollbars
- Floating showcase cards displaying correct pastel subject badges with hover elevation
- Pagefind client-side search modal functioning smoothly across all restructured pages

---

### Task 1: Cadmus Design Tokens, Font Integration & Global CSS System

**Files:**
- Modify: `src/styles/global.css`
- Test: `tests/styles/design-tokens.test.ts`

**Interfaces:**
- Produces: Cadmus CSS custom properties (`--color-wine`, `--color-bg-parchment`, `--color-peach`, etc.), typography utility classes (`.italic-serif`, `.badge-pill`, `.vellum-box`, `.floating-card`), and keyframe animations (`@keyframes scroll`, `@keyframes float`).

- [ ] **Step 1: Write test for Cadmus design tokens and font imports**

```typescript
// tests/styles/design-tokens.test.ts
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
```

- [ ] **Step 2: Run test to verify failure**

Run: `npx vitest run tests/styles/design-tokens.test.ts`  
Expected: FAIL

- [ ] **Step 3: Update `src/styles/global.css` with Cadmus design system**

Add:
- Google Fonts `@import` for `STIX Two Text:ital,wght@0,400..700;1,400..700` and `Inter`.
- CSS custom properties in `:root` for Cadmus palette (`--color-wine: #580c1d`, `--color-bg-parchment: #fcf7ef`, etc.).
- Global base styles applying warm parchment background and high-contrast charcoal text.
- Reusable utility classes: `.italic-serif`, `.badge-pill`, `.vellum-card`, `@keyframes scroll`, `@keyframes float`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/styles/design-tokens.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css tests/styles/design-tokens.test.ts
git commit -m "style: establish Cadmus design tokens, warm palette, and typography system (task 1)"
```

---

### Task 2: Floating Island Header & Mobile Drawer Navigation

**Files:**
- Modify: `src/components/Header.astro`
- Test: `tests/components/header.test.ts`

**Interfaces:**
- Consumes: Cadmus design tokens (`--color-wine`, `--color-surface`, `--color-vellum-border`)
- Produces: De-congested floating pill header (`max-width: 920px`, rounded, drop shadow) with streamlined navigation (`/books/`, `/notes/`, `/past-papers/`, `/scholarships/`), quick search button (`Ctrl+K`), wine CTA button ("Explore Resources"), and responsive mobile drawer.

- [ ] **Step 1: Update header test with floating island and streamlined links**

```typescript
// tests/components/header.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Header Component', () => {
  it('should render floating island container and Cadmus navigation structure', () => {
    const headerPath = path.resolve(process.cwd(), 'src/components/Header.astro');
    const content = fs.readFileSync(headerPath, 'utf-8');

    // Floating island pill class
    expect(content).toContain('header-island');
    // Core de-congested navigation links
    expect(content).toContain('href="/books/"');
    expect(content).toContain('href="/notes/"');
    expect(content).toContain('href="/past-papers/"');
    expect(content).toContain('href="/scholarships/"');
    // Search trigger button
    expect(content).toContain('data-open-search');
  });

  it('should have mobile drawer toggle with accessible controls', () => {
    const headerPath = path.resolve(process.cwd(), 'src/components/Header.astro');
    const content = fs.readFileSync(headerPath, 'utf-8');

    expect(content).toContain('mobile-menu-btn');
    expect(content).toContain('mobile-nav-drawer');
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npx vitest run tests/components/header.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement Cadmus floating island in `src/components/Header.astro`**

- Container: `<header class="header-island-wrapper"><div class="header-island">...</div></header>` with `max-width: 920px; margin: 20px auto; border-radius: 12px; background: #fffdfa; box-shadow: 1px 8px 16px hsla(26,28%,75%,0.18);`.
- Navigation: 4 clean links with generous spacing (`gap: 24px`).
- Right actions: Search button with `Ctrl+K` badge + Wine CTA button (`background: var(--color-wine); color: #fff; padding: 8px 18px; border-radius: 8px;`).
- Mobile: Spacious bar with hamburger button opening clean sliding drawer with large touch targets.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/components/header.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.astro tests/components/header.test.ts
git commit -m "feat: implement Cadmus floating island header with clean navigation and mobile drawer (task 2)"
```

---

### Task 3: Hero Section with Interactive 4-Card Floating Showcase & Metrics

**Files:**
- Modify: `src/components/Hero.astro`
- Test: `tests/components/hero.test.ts`

**Interfaces:**
- Consumes: Cadmus wine palette (`--color-wine`, `--color-wine-dark`, `--color-peach`), pastel badges
- Produces: Atmospheric wine hero with two-tone headline, italic serif accent, integrated search bar, interactive 4-card showcase, and metrics bar.

- [ ] **Step 1: Update hero test for Cadmus layout and floating showcase**

```typescript
// tests/components/hero.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Hero Component', () => {
  it('should render wine hero container with italic serif headline accent', () => {
    const heroPath = path.resolve(process.cwd(), 'src/components/Hero.astro');
    const content = fs.readFileSync(heroPath, 'utf-8');

    expect(content).toContain('hero-wine-section');
    expect(content).toContain('italic-serif');
    expect(content).toContain('UN SDG 4');
  });

  it('should render interactive 4-card showcase with pastel tags', () => {
    const heroPath = path.resolve(process.cwd(), 'src/components/Hero.astro');
    const content = fs.readFileSync(heroPath, 'utf-8');

    expect(content).toContain('hero-cards-showcase');
    expect(content).toContain('hero-showcase-card');
    expect(content).toContain('hero-metrics-pill');
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npx vitest run tests/components/hero.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement Cadmus Hero in `src/components/Hero.astro`**

- Container: Deep wine gradient (`linear-gradient(180deg, #580c1d 0%, #3d0714 100%)`) with warm radial peach glow.
- Headline: `Quality Education for <span class="italic-serif">Pakistani Students</span>`.
- Eyebrow: Peach pill badge (`#ffe7db`) highlighting UN SDG 4 Quality Education commitment.
- Interactive 4-Card Showcase: 4 distinct cards representing Class 9 Physics (Lime `#d1e375`), Class 10 Biology (Blue `#b6dbff`), Class 11 English (Lavender `#c5c5ff`), and Class 12 Math (Peach `#ffc8ae`), animated with gentle `@keyframes float` and hover elevation.
- Hero Search: Integrated search input with vellum border and warm focus glow.
- Metrics Pill: Warm parchment card container showing `500,000+ Students`, `15+ Subjects`, `100% Free Forever`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/components/hero.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro tests/components/hero.test.ts
git commit -m "feat: implement Cadmus wine hero with floating 4-card showcase and metrics (task 3)"
```

---

### Task 4: Polish Card Components (`ResourceCard.astro`, `DownloadBox.astro`, `AdUnit.astro`)

**Files:**
- Modify: `src/components/ResourceCard.astro`
- Modify: `src/components/DownloadBox.astro`
- Modify: `src/components/AdUnit.astro`
- Test: `tests/components/resource-card.test.ts`

**Interfaces:**
- Consumes: Cadmus vellum border (`#cfc0b0`), surface card (`#fffdfa`), soft shadows
- Produces: Polished resource cards with pastel badges, smooth hover lift (`transform: translateY(-4px)`), verified Punjab Board download badges, and zero-CLS ad containment.

- [ ] **Step 1: Update resource card tests for Cadmus styling and pastel badges**

```typescript
// tests/components/resource-card.test.ts
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
```

- [ ] **Step 2: Run test to verify failure**

Run: `npx vitest run tests/components/resource-card.test.ts`  
Expected: FAIL

- [ ] **Step 3: Update `ResourceCard.astro`, `DownloadBox.astro`, and `AdUnit.astro`**

- `ResourceCard.astro`: Warm off-white `#fffdfa`, `1px solid #cfc0b0` border, soft drop shadow, pastel subject badge, clean thumbnail wrapper, and wine hover accent.
- `DownloadBox.astro`: High-trust box with verified Punjab Board shield icon, file size, PDF format tag, and direct download button.
- `AdUnit.astro`: Clean vellum border with dashed line (`1px dashed #cfc0b0`) and zero layout shift.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/components/resource-card.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ResourceCard.astro src/components/DownloadBox.astro src/components/AdUnit.astro tests/components/resource-card.test.ts
git commit -m "feat: polish resource cards and download box with Cadmus vellum aesthetics (task 4)"
```

---

### Task 5: Cadmus Section Flow, Value Proposition, Testimonials & Footer

**Files:**
- Modify: `src/components/FeatureGrid.astro`
- Modify: `src/components/Testimonials.astro`
- Modify: `src/components/MarqueeBanner.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`
- Test: `tests/components/footer.test.ts`, `tests/pages/index.test.ts`

**Interfaces:**
- Consumes: Cadmus section rhythm (Wine Hero → Warm Parchment → Peach Tint → Surface → Wine Footer)
- Produces: Complete Home Page with alternating tinted sections, infinite scroll board logo marquee, floating student quote cards, and wine footer.

- [ ] **Step 1: Update footer and home page tests for Cadmus flow**

```typescript
// tests/components/footer.test.ts
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
```

- [ ] **Step 2: Run tests to verify failure/status**

Run: `npx vitest run tests/components/footer.test.ts tests/pages/index.test.ts`

- [ ] **Step 3: Update `FeatureGrid.astro`, `Testimonials.astro`, `MarqueeBanner.astro`, `Footer.astro`, and `src/pages/index.astro`**

- `FeatureGrid.astro`: Light peach background (`#ffe7db`), large stylized numbers (`01`, `02`), clean typography.
- `Testimonials.astro`: Floating quote cards with student ratings and 100% satisfaction badge.
- `MarqueeBanner.astro`: Seamless infinite ticker (`@keyframes scroll`) with Punjab Board examination partners.
- `Footer.astro`: Deep wine background (`#580c1d`), warm peach text (`#ffe7db`), 4 organized columns, and newsletter form.
- `src/pages/index.astro`: Assemble all sections with generous spacing (`padding: 90px 0`), smooth transitions, and responsive container widths.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/components/footer.test.ts tests/pages/index.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/FeatureGrid.astro src/components/Testimonials.astro src/components/MarqueeBanner.astro src/components/Footer.astro src/pages/index.astro tests/components/footer.test.ts tests/pages/index.test.ts
git commit -m "feat: assemble complete Cadmus section rhythm, marquee banner, and wine footer (task 5)"
```

---

### Task 6: Hub Pages & Full Verification Suite

**Files:**
- Modify: `src/pages/books/index.astro`
- Modify: `src/pages/notes/index.astro`
- Modify: `src/pages/[slug].astro`
- Test: `tests/verification.test.ts`

**Interfaces:**
- Consumes: All updated Cadmus components
- Produces: 100% test-passing suite and static build generating 25 static pages and Pagefind index.

- [ ] **Step 1: Align Hub pages (`/books/`, `/notes/`, `/[slug].astro`) with Cadmus theme**

Update page containers, headers, and archive grids to use the warm parchment background (`#fcf7ef`) and vellum cards.

- [ ] **Step 2: Run all Vitest unit tests**

Run: `npm test`  
Expected: All 12 test suites PASS (22+ unit tests).

- [ ] **Step 3: Run production Astro build and Pagefind indexer**

Run: `npm run build`  
Expected: Build passes, generating 25 static pages in `dist/`, followed by Pagefind indexer outputting search index.

- [ ] **Step 4: Commit**

```bash
git add src/pages/books/ src/pages/notes/ src/pages/[slug].astro tests/verification.test.ts
git commit -m "feat: align all hub routes and single post template with Cadmus styling (task 6)"
```
