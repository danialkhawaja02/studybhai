# Study Bhai Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the entire Study Bhai WordPress website into a blazing-fast, zero-server-cost Astro 5 static platform integrated with headless WordPress on existing shared hosting and Pagefind search.

**Architecture:** Astro 5 Static Site Generation (SSG) fetching educational notes and books from headless WordPress REST API (`cms.studybhai.com`) at build time with local fallback cache. Deployed to Cloudflare Pages edge CDN with automated instant build webhooks and client-side WebAssembly search.

**Tech Stack:** Astro 5, TypeScript, Vanilla CSS (Design Tokens & Utility Classes), Vitest, Pagefind.

**Spec:** [`docs/superpowers/specs/2026-10-19-studybhai-astro-rebuild-design.md`](file:///c:/Users/PMLS/Desktop/StudyBhai/docs/superpowers/specs/2026-10-19-studybhai-astro-rebuild-design.md)

## Global Constraints
- Target Framework: Astro 5.x with Static Output (`output: 'static'`).
- Styling: Vanilla CSS with custom properties (`src/styles/global.css`) matching Study Bhai brand colors (`#1F2E2B` primary slate, `#059669` brand emerald, `#F59E0B` warm gold). No heavy frameworks.
- Zero Server Cost: No dedicated VPS/Node server required; runs on Cloudflare Pages free tier.
- URL Fidelity: All article/note routes must match existing WordPress slugs (`/[slug]/`) to protect Google rankings and backlinks.
- Offline/Dev Resilience: Local builds and `npm run dev` must never fail if the WordPress endpoint is unreachable or rate-limited; fallback to `src/data/mockData.ts`.
- Zero Cumulative Layout Shift (CLS): All ad containers and media boxes must pre-allocate strict aspect ratios.

## Review Focus
1. **Network Timeout / WordPress API Down**: When `cms.studybhai.com` is unreachable during `npm run build`, the build must gracefully log a warning and fall back to local mock data without failing.
2. **Missing Featured Image or Thumbnail**: Posts without `_embedded['wp:featuredmedia']` must render a beautiful fallback gradient/subject icon instead of a broken `<img>` tag.
3. **Empty or Missing Excerpt**: Posts without custom excerpts must auto-generate a clean 160-character plain text excerpt stripped of HTML tags for meta descriptions.
4. **Search Modal Keyboard Trapping & Accessibility**: Search modal must close on `Escape`, focus input on open (`Ctrl+K` or `/`), and navigate results with arrow keys.
5. **AdSense Zero-CLS Reservation**: Empty or ad-blocked containers must not collapse violently; layout dimensions must be locked via CSS.

---

## Tasks

### Task 1: Project Scaffolding & Test Harness Setup

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`

**Interfaces:**
- Produces: Astro 5 build environment, TypeScript config, and Vitest test runner.

- [ ] **Step 1: Write initial test to verify Vitest environment**
```typescript
// tests/setup.test.ts
import { describe, it, expect } from 'vitest';

describe('Environment Setup', () => {
  it('should run tests successfully', () => {
    expect(true).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify failure before configuration**
Run: `npx vitest run tests/setup.test.ts`
Expected: FAIL (vitest not yet installed/configured)

- [ ] **Step 3: Create package.json and install Astro 5, TypeScript, Vitest, and Pagefind**
Configure scripts: `dev`, `build`, `preview`, `test`. Install `astro`, `typescript`, `@types/node`, `vitest`, `pagefind`.

- [ ] **Step 4: Configure `astro.config.mjs`, `tsconfig.json`, and `vitest.config.ts`**
Set `output: 'static'` in Astro config and configure path alias `@/*` to `./src/*`.

- [ ] **Step 5: Run tests and Astro check**
Run: `npm test`
Expected: PASS

- [ ] **Step 6: Commit**
```bash
git add package.json astro.config.mjs tsconfig.json vitest.config.ts tests/
git commit -m "chore: scaffold Astro 5 project with TypeScript and Vitest"
```

---

### Task 2: Data Models, Mock Dataset & WordPress API Client

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/mockData.ts`
- Create: `src/lib/wordpress.ts`
- Test: `tests/lib/wordpress.test.ts`

**Interfaces:**
- Produces: 
  - Types: `Post`, `Category`, `Author`, `ResourceMeta`
  - Functions: `getAllPosts(): Promise<Post[]>`, `getPostBySlug(slug: string): Promise<Post | null>`, `getCategories(): Promise<Category[]>`, `getPostsByCategory(categorySlug: string): Promise<Post[]>`

- [ ] **Step 1: Write failing tests for WordPress API client and fallback behavior**
```typescript
// tests/lib/wordpress.test.ts
import { describe, it, expect, vi } from 'vitest';
import { getAllPosts, getPostBySlug, getCategories } from '@/lib/wordpress';

describe('WordPress API Client', () => {
  it('should return mock posts when API fetch fails or is in dev fallback mode', async () => {
    const posts = await getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('slug');
    expect(posts[0]).toHaveProperty('content');
  });

  it('should find a post by slug', async () => {
    const post = await getPostBySlug('class-12-math-notes');
    expect(post).not.toBeNull();
    expect(post?.slug).toBe('class-12-math-notes');
  });

  it('should return categories including ptb-books and notes', async () => {
    const categories = await getCategories();
    expect(categories.some(c => c.slug === 'ptb-books')).toBe(true);
    expect(categories.some(c => c.slug === 'notes')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify failure**
Run: `npm test tests/lib/wordpress.test.ts`
Expected: FAIL

- [ ] **Step 3: Define TypeScript interfaces in `src/types/index.ts`**
Define `Post`, `Category`, `Author`, `SubjectType` ('Math' | 'Physics' | 'Chemistry' | 'Biology' | 'English' | 'General'), and `GradeLevel` ('9' | '10' | '11' | '12' | 'General').

- [ ] **Step 4: Create high-fidelity Pakistani educational dataset in `src/data/mockData.ts`**
Include real Study Bhai resources: Class 12 Math Notes, HEC Stipend Hungaricum Scholarship 2024, USAT Book Guide HEC Test, Class 9 Physics PTB Book, Class 10 Chemistry Notes, Class 11 English Past Papers.

- [ ] **Step 5: Implement `src/lib/wordpress.ts`**
Implement fetching from `WORDPRESS_API_URL` with a 3-second timeout, error catching, and automatic fallback to `mockData`. Include HTML excerpt stripper for clean summaries.

- [ ] **Step 6: Run tests and verify they pass**
Run: `npm test tests/lib/wordpress.test.ts`
Expected: PASS

- [ ] **Step 7: Commit**
```bash
git add src/types/ src/data/ src/lib/ tests/lib/
git commit -m "feat: implement WordPress API client with mock data fallback"
```

---

### Task 3: Global Design System, Tokens & SEO Shell

**Files:**
- Create: `src/styles/global.css`
- Create: `src/components/SEO.astro`
- Create: `src/layouts/Layout.astro`
- Test: `tests/components/seo.test.ts`

**Interfaces:**
- Consumes: Google Fonts (`Space Grotesk`, `Inter`), CSS custom properties
- Produces: `Layout.astro` wrapper component, global typography, container utilities, and SEO head tags

- [ ] **Step 1: Write test for SEO metadata and structured schema generation**
```typescript
// tests/components/seo.test.ts
import { describe, it, expect } from 'vitest';
import { generateSchemaOrg } from '@/lib/seo';

describe('SEO Schema Generator', () => {
  it('should generate valid EducationalWebSite schema for home page', () => {
    const schema = generateSchemaOrg({ title: 'Study Bhai', description: 'Quality Education', isArticle: false });
    expect(schema['@type']).toBe('EducationalWebSite');
    expect(schema.name).toBe('Study Bhai');
  });

  it('should generate valid Article schema for notes post', () => {
    const schema = generateSchemaOrg({ title: 'Class 12 Math Notes', description: 'Full notes', isArticle: true, datePublished: '2025-08-01' });
    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toBe('Class 12 Math Notes');
  });
});
```

- [ ] **Step 2: Run test to verify failure**
Run: `npm test tests/components/seo.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/lib/seo.ts` helper and verify tests pass**
Implement helper that generates canonical URLs, Open Graph tags, and JSON-LD structured schemas.
Run: `npm test tests/components/seo.test.ts`
Expected: PASS

- [ ] **Step 4: Create `src/styles/global.css`**
Set up CSS custom properties:
- Colors: `--color-primary: #1F2E2B`, `--color-brand: #059669`, `--color-brand-hover: #10B981`, `--color-accent: #F59E0B`, `--color-bg: #F8FAFC`, `--color-card: #FFFFFF`, `--color-border: #E2E8F0`, `--color-text: #1E293B`, `--color-text-muted: #64748B`.
- Fonts: `--font-heading: 'Space Grotesk', sans-serif`, `--font-body: 'Inter', sans-serif`.
- Utilities: `.container`, `.glass-panel`, `.badge`, `.btn-primary`, `.btn-outline`, `.grid-cards`.

- [ ] **Step 5: Create `src/components/SEO.astro` and `src/layouts/Layout.astro`**
Wire up Google Fonts preloading, responsive meta tags, favicon icons, View Transitions, and SEO head.

- [ ] **Step 6: Commit**
```bash
git add src/styles/ src/lib/seo.ts src/components/SEO.astro src/layouts/Layout.astro tests/components/
git commit -m "feat: add global design system, CSS variables, and SEO layout shell"
```

---

### Task 4: Navigation Header & Mobile Drawer

**Files:**
- Create: `src/components/Header.astro`
- Test: `tests/components/header.test.ts`

**Interfaces:**
- Consumes: Navigation links (Books, Notes, Past Papers, Guides, Scholarships, About, Contact)
- Produces: Responsive sticky header with desktop mega-menu dropdowns, mobile sliding drawer, and `Ctrl+K` search button trigger.

- [ ] **Step 1: Write unit test for header navigation structure**
```typescript
// tests/components/header.test.ts
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
```

- [ ] **Step 2: Run test to verify failure**
Run: `npm test tests/components/header.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/lib/navigation.ts` and verify test passes**
Define `NAV_ITEMS` array with dropdown sub-items for PTB books and class notes.
Run: `npm test tests/components/header.test.ts`
Expected: PASS

- [ ] **Step 4: Implement `src/components/Header.astro`**
Build sticky header with dark slate background (`#1F2E2B`), Study Bhai SVG logo, hover dropdown menus with smooth fade-in, search shortcut button (`Ctrl+K`), and hamburger toggle for mobile devices.

- [ ] **Step 5: Commit**
```bash
git add src/lib/navigation.ts src/components/Header.astro tests/components/header.test.ts
git commit -m "feat: implement responsive Header with desktop dropdowns and mobile drawer"
```

---

### Task 5: Hero Section & Live Metrics Counter

**Files:**
- Create: `src/components/Hero.astro`
- Test: `tests/components/hero.test.ts`

**Interfaces:**
- Produces: Hero section featuring UN SDG Goal 4 quality education badge, headline, instant search input, CTA buttons, metrics counters (15+ Subjects, 500K+ Students, 4 SDG Focus), and quick grade filter pills (9th, 10th, 11th, 12th).

- [ ] **Step 1: Write test for hero metrics and grade filter data**
```typescript
// tests/components/hero.test.ts
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
```

- [ ] **Step 2: Run test to verify failure**
Run: `npm test tests/components/hero.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/lib/constants.ts` and verify test passes**
Export `HERO_STATS` and `GRADE_FILTERS`.
Run: `npm test tests/components/hero.test.ts`
Expected: PASS

- [ ] **Step 4: Implement `src/components/Hero.astro`**
Craft the premium ed-tech startup hero section:
- SDG 4 badge with gold star icon.
- Main title: "Quality Education for All Pakistani Students".
- Interactive grade pills linking to `/books/class-9/`, `/books/class-10/`, etc.
- Stat counters with subtle glassmorphic backdrop.
- Hero search input that opens the search modal upon click or keydown.

- [ ] **Step 5: Commit**
```bash
git add src/lib/constants.ts src/components/Hero.astro tests/components/hero.test.ts
git commit -m "feat: create Hero section with live educational metrics and grade chips"
```

---

### Task 6: ResourceCard & DownloadBox Components

**Files:**
- Create: `src/components/ResourceCard.astro`
- Create: `src/components/DownloadBox.astro`
- Test: `tests/components/resource-card.test.ts`

**Interfaces:**
- Consumes: `Post` type from `src/types/index.ts`
- Produces:
  - `ResourceCard.astro`: Reusable card for books, notes, and past papers with subject icon, grade badge, download action, and reading time.
  - `DownloadBox.astro`: High-trust PDF download widget with file size, board accreditation, and verified button.

- [ ] **Step 1: Write test for resource card utility helpers**
```typescript
// tests/components/resource-card.test.ts
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
    const time = calculateReadTime('Lorem ipsum '.repeat(300));
    expect(time).toBe('2 min read');
  });
});
```

- [ ] **Step 2: Run test to verify failure**
Run: `npm test tests/components/resource-card.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/lib/resource-utils.ts` and verify test passes**
Helper functions to deduce grade, subject, and reading time from WordPress data.
Run: `npm test tests/components/resource-card.test.ts`
Expected: PASS

- [ ] **Step 4: Implement `src/components/ResourceCard.astro` and `src/components/DownloadBox.astro`**
- Card features: Subject badge color-coding (Math: Blue, Physics: Purple, Chemistry: Orange, Biology: Green), clean thumbnail preview, hover elevation, and direct link.
- DownloadBox features: Board badge (Punjab Textbook Board), PDF icon, file size indicator, and high-contrast green download button.

- [ ] **Step 5: Commit**
```bash
git add src/lib/resource-utils.ts src/components/ResourceCard.astro src/components/DownloadBox.astro tests/components/resource-card.test.ts
git commit -m "feat: implement ResourceCard and verified DownloadBox components"
```

---

### Task 7: Feature Highlights, Testimonials & Footer

**Files:**
- Create: `src/components/FeatureGrid.astro`
- Create: `src/components/Testimonials.astro`
- Create: `src/components/MarqueeBanner.astro`
- Create: `src/components/Footer.astro`
- Test: `tests/components/footer.test.ts`

**Interfaces:**
- Produces: Value proposition grid (Career Guidance, Free Resources, 24/7 Support), real Pakistani student reviews with 5-star ratings, animated course marquee, and dark multi-column footer.

- [ ] **Step 1: Write test for footer link structure and social profiles**
```typescript
// tests/components/footer.test.ts
import { describe, it, expect } from 'vitest';
import { FOOTER_DATA } from '@/lib/constants';

describe('Footer Data', () => {
  it('should contain valid legal links and contact email', () => {
    expect(FOOTER_DATA.email).toBe('support@studybhai.com');
    expect(FOOTER_DATA.legalLinks.map(l => l.label)).toContain('Privacy Policy');
    expect(FOOTER_DATA.legalLinks.map(l => l.label)).toContain('Terms of Services');
  });
});
```

- [ ] **Step 2: Run test to verify failure**
Run: `npm test tests/components/footer.test.ts`
Expected: FAIL

- [ ] **Step 3: Update `src/lib/constants.ts` with `FOOTER_DATA` and verify test passes**
Add real Study Bhai contact email, Instagram link, and legal navigation.
Run: `npm test tests/components/footer.test.ts`
Expected: PASS

- [ ] **Step 4: Implement `FeatureGrid.astro`, `Testimonials.astro`, `MarqueeBanner.astro`, and `Footer.astro`**
- `FeatureGrid`: "01 Guidance for Career & Studies", "02 Free Resources, Endless Possibilities", and "Unlock Your Full Potential with Study Bhai".
- `Testimonials`: Real student reviews (Sakina Hassan, Muhammad Ibrahim, Ali Imran) with 5-star ratings and student feedback statistics (100% Student Satisfaction).
- `Footer`: Clean dark slate design with newsletter subscription form, copyright, and social links.

- [ ] **Step 5: Commit**
```bash
git add src/components/FeatureGrid.astro src/components/Testimonials.astro src/components/MarqueeBanner.astro src/components/Footer.astro
git commit -m "feat: implement FeatureGrid, student Testimonials, Marquee banner, and Footer"
```

---

### Task 8: Home Page Assembly & Page Build Validation

**Files:**
- Create: `src/pages/index.astro`
- Test: `tests/pages/index.test.ts`

**Interfaces:**
- Consumes: `Layout.astro`, `Hero.astro`, `ResourceCard.astro`, `FeatureGrid.astro`, `MarqueeBanner.astro`, `Testimonials.astro`, `Footer.astro`, `getAllPosts()`
- Produces: Complete, high-performance home page at `/`.

- [ ] **Step 1: Write test verifying home page data fetching and section composition**
```typescript
// tests/pages/index.test.ts
import { describe, it, expect } from 'vitest';
import { getAllPosts } from '@/lib/wordpress';

describe('Home Page Data', () => {
  it('should fetch latest educational resources for home page sections', async () => {
    const posts = await getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    const notes = posts.filter(p => p.categories.includes('notes') || p.categories.includes('12th-class-notes'));
    expect(notes.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify data pipeline passes**
Run: `npm test tests/pages/index.test.ts`
Expected: PASS

- [ ] **Step 3: Assemble `src/pages/index.astro`**
Compose the complete Study Bhai landing page matching the familiar brand structure with modern startup aesthetics:
1. Hero with live search & SDG 4 badge
2. Grade selector pills (9th–12th)
3. Value Proposition grid (Guidance for Career & Studies, Free Resources)
4. Featured Notes & Books grid
5. "Unlock Your Full Potential with Study Bhai" features section
6. Course / Tutors announcement marquee
7. Student Feedback / Testimonials section with 100% satisfaction highlight
8. Latest Guides & Scholarship blog cards
9. Contact & Instagram banner callouts

- [ ] **Step 4: Build Astro project and verify static generation**
Run: `npm run build`
Expected: Successful build generating `dist/index.html` with zero errors.

- [ ] **Step 5: Commit**
```bash
git add src/pages/index.astro tests/pages/index.test.ts
git commit -m "feat: assemble complete home page with all Study Bhai educational sections"
```

---

### Task 9: Educational Hubs & Category Archive Routes

**Files:**
- Create: `src/pages/books/index.astro`
- Create: `src/pages/books/[grade].astro`
- Create: `src/pages/notes/index.astro`
- Create: `src/pages/notes/[grade].astro`
- Create: `src/pages/past-papers/index.astro`
- Create: `src/pages/guides/index.astro`
- Create: `src/pages/scholarships/index.astro`
- Test: `tests/pages/categories.test.ts`

**Interfaces:**
- Produces: Static routes for all primary categories and grade-specific sub-archives.

- [ ] **Step 1: Write test for category static path resolution**
```typescript
// tests/pages/categories.test.ts
import { describe, it, expect } from 'vitest';
import { getGradeStaticPaths } from '@/lib/resource-utils';

describe('Grade Static Paths', () => {
  it('should return static paths for grades 9, 10, 11, and 12', () => {
    const paths = getGradeStaticPaths();
    expect(paths.map(p => p.params.grade)).toEqual(['class-9', 'class-10', 'class-11', 'class-12']);
  });
});
```

- [ ] **Step 2: Run test to verify failure**
Run: `npm test tests/pages/categories.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `getGradeStaticPaths` helper in `src/lib/resource-utils.ts`**
Run: `npm test tests/pages/categories.test.ts`
Expected: PASS

- [ ] **Step 4: Implement category archive pages**
Create clean grid views with breadcrumb navigation, grade filter chips, and sorting by subject for:
- Books: `/books/` and `/books/[grade].astro`
- Notes: `/notes/` and `/notes/[grade].astro`
- Past Papers: `/past-papers/index.astro`
- Guides & Scholarships: `/guides/index.astro` and `/scholarships/index.astro`

- [ ] **Step 5: Run Astro build to verify all category pages generate statically**
Run: `npm run build`
Expected: Build passes, generating static HTML files for all category routes.

- [ ] **Step 6: Commit**
```bash
git add src/pages/books/ src/pages/notes/ src/pages/past-papers/ src/pages/guides/ src/pages/scholarships/
git commit -m "feat: implement all educational hub and category archive routes"
```

---

### Task 10: Single Post/Note Dynamic Route & Table of Contents

**Files:**
- Create: `src/components/TableOfContents.astro`
- Create: `src/pages/[slug].astro`
- Test: `tests/pages/post.test.ts`

**Interfaces:**
- Consumes: `getAllPosts()` via `getStaticPaths()`
- Produces: Single article/note page at `/[slug]/` with table of contents, verified download box, social share, related posts, and schema markup.

- [ ] **Step 1: Write test for Table of Contents heading extractor**
```typescript
// tests/pages/post.test.ts
import { describe, it, expect } from 'vitest';
import { extractHeadingsFromHtml } from '@/lib/content-parser';

describe('Content Parser', () => {
  it('should extract h2 and h3 headings with generated anchor slugs', () => {
    const html = '<h2>Overview</h2><p>text</p><h3>Key Points</h3>';
    const headings = extractHeadingsFromHtml(html);
    expect(headings).toEqual([
      { depth: 2, text: 'Overview', slug: 'overview' },
      { depth: 3, text: 'Key Points', slug: 'key-points' },
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify failure**
Run: `npm test tests/pages/post.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/lib/content-parser.ts` and verify test passes**
Parse HTML content, inject heading IDs for smooth scroll anchoring, and extract TOC items.
Run: `npm test tests/pages/post.test.ts`
Expected: PASS

- [ ] **Step 4: Implement `src/components/TableOfContents.astro` and `src/pages/[slug].astro`**
- Sticky sidebar table of contents for long notes/guides.
- Clean post typography with syntax formatting, callout notes, and download badges.
- High-trust DownloadBox embedded at top and bottom of download resources.
- Author bio card (Danial Sohail) and related guides grid.

- [ ] **Step 5: Verify build with dynamic slugs**
Run: `npm run build`
Expected: PASS, generating static HTML for every post slug.

- [ ] **Step 6: Commit**
```bash
git add src/lib/content-parser.ts src/components/TableOfContents.astro src/pages/[slug].astro tests/pages/post.test.ts
git commit -m "feat: implement single post dynamic route with Table of Contents and download box"
```

---

### Task 11: Pagefind Client-Side Search Modal & Static Indexing

**Files:**
- Create: `src/components/SearchModal.astro`
- Modify: `src/layouts/Layout.astro`
- Modify: `package.json`
- Test: `tests/components/search.test.ts`

**Interfaces:**
- Consumes: Pagefind WebAssembly search index
- Produces: Instant global search modal triggered via `Ctrl+K`, `/`, or search button, searching across all notes, books, and guides.

- [ ] **Step 1: Write test for search indexable attribute annotations**
```typescript
// tests/components/search.test.ts
import { describe, it, expect } from 'vitest';
import { formatSearchSnippet } from '@/lib/search-utils';

describe('Search Utilities', () => {
  it('should format snippet highlights safely', () => {
    const raw = 'Download free <mark>Class 12 Math</mark> notes for examination';
    const clean = formatSearchSnippet(raw);
    expect(clean).toContain('<mark>Class 12 Math</mark>');
  });
});
```

- [ ] **Step 2: Run test to verify failure**
Run: `npm test tests/components/search.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/lib/search-utils.ts` and verify test passes**
Run: `npm test tests/components/search.test.ts`
Expected: PASS

- [ ] **Step 4: Implement `src/components/SearchModal.astro`**
- Keyboard trap and focus management (`Ctrl+K` to toggle, `Escape` to close).
- Dynamic search input querying Pagefind API in the browser.
- Instant result cards with highlighted keyword matches and subject badges.
- Embedded in `Layout.astro`.

- [ ] **Step 5: Update `package.json` build script**
Change `"build": "astro build && pagefind --site dist"` so that every build generates an up-to-date static search index.

- [ ] **Step 6: Run build and verify Pagefind indexing**
Run: `npm run build`
Expected: Astro build succeeds, followed by Pagefind indexing outputting `dist/pagefind/`.

- [ ] **Step 7: Commit**
```bash
git add src/lib/search-utils.ts src/components/SearchModal.astro src/layouts/Layout.astro package.json
git commit -m "feat: implement Pagefind client-side search modal with Ctrl+K shortcut"
```

---

### Task 12: Zero-CLS AdSense Integration, Static Pages & Final Verification

**Files:**
- Create: `src/components/AdUnit.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/contact.astro`
- Create: `src/pages/privacy-policy.astro`
- Create: `src/pages/terms-of-services.astro`
- Create: `docs/deployment-guide.md`
- Test: `tests/verification.test.ts`

**Interfaces:**
- Consumes: Google AdSense client ID (configurable via env)
- Produces: Zero-CLS ad placeholders, required legal & contact pages, complete build verification, and deployment documentation.

- [ ] **Step 1: Write comprehensive verification test**
```typescript
// tests/verification.test.ts
import { describe, it, expect } from 'vitest';
import { getAllPosts, getCategories } from '@/lib/wordpress';
import { NAV_ITEMS } from '@/lib/navigation';

describe('Full Site Verification', () => {
  it('should have all navigation links, categories, and posts operational', async () => {
    const posts = await getAllPosts();
    const categories = await getCategories();
    expect(posts.length).toBeGreaterThan(0);
    expect(categories.length).toBeGreaterThan(0);
    expect(NAV_ITEMS.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run verification test**
Run: `npm test tests/verification.test.ts`
Expected: PASS

- [ ] **Step 3: Implement `src/components/AdUnit.astro`**
Build ad wrapper with pre-allocated CSS aspect ratios and min-heights (`min-h-[90px]`, `min-h-[250px]`, `min-h-[280px]`) preventing layout shifts. Loads Google AdSense asynchronously only when in viewport.

- [ ] **Step 4: Implement static pages (`about.astro`, `contact.astro`, `privacy-policy.astro`, `terms-of-services.astro`)**
Create clean, professional pages matching the existing site's content and legal policies.

- [ ] **Step 5: Write `docs/deployment-guide.md`**
Detailed step-by-step instructions for:
1. Setting up Cloudflare Pages project linked to GitHub.
2. Configuring `WORDPRESS_API_URL` environment variable.
3. Setting up the Cloudflare Deploy Hook and WordPress webhook.
4. Configuring DNS records for `studybhai.com` and `cms.studybhai.com`.

- [ ] **Step 6: Run full build and test suite**
Run: `npm test && npm run build`
Expected: All tests PASS; build finishes successfully with zero warnings/errors.

- [ ] **Step 7: Commit**
```bash
git add src/components/AdUnit.astro src/pages/about.astro src/pages/contact.astro src/pages/privacy-policy.astro src/pages/terms-of-services.astro docs/deployment-guide.md tests/verification.test.ts
git commit -m "feat: add zero-CLS AdSense component, legal pages, and deployment documentation"
```
