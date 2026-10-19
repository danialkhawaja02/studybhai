# Study Bhai Rebuild Design Specification
**Date:** 2026-10-19  
**Status:** Approved by User  
**Target Architecture:** Astro 5 SSG + Headless WordPress (Shared Hosting) + Cloudflare Pages  

---

## 1. Executive Summary & Objectives
Study Bhai (`studybhai.com`) is a premier educational resource platform for Pakistani students, providing official Punjab Textbook Board (PTB) & Federal Board books, chapter-wise notes (Class 9, 10, 11, 12), past papers, USAT/HEC test guides, and scholarships.

### Core Problems with Current Implementation
1. **Performance & Core Web Vitals**: WordPress + Elementor (Theme: Crafto) loads bloated CSS/JS bundles, complex DOM trees, and heavy runtime scripts (Airlift optimizer, Atropos, particles), causing high Time to First Byte (TTFB), Cumulative Layout Shift (CLS), and poor mobile performance on Pakistani 3G/4G networks.
2. **SEO Optimization**: Heavy client scripts and dynamic rendering degrade search engine indexing speed and Core Web Vitals rankings.
3. **Backend Cost Constraint**: The platform must operate with **$0 dedicated server cost**, utilizing the existing shared hosting without incurring additional server bills.

### Solution & Objectives
- Rebuild the entire frontend in **Astro 5** utilizing **Static Site Generation (SSG)** and deployed to **Cloudflare Pages (100% Free Tier)**.
- Retain the existing shared hosting solely for WordPress `wp-admin` (`cms.studybhai.com`) as a headless content management system.
- Match the familiar, proven layout and brand identity of Study Bhai while infusing a sleek, **"premium ed-tech startup"** aesthetic (modern micro-borders, glassmorphism, clean typography, fast view transitions).
- Implement zero-server-cost instant search via **Pagefind** (WebAssembly).
- Integrate **Google AdSense** with zero Cumulative Layout Shift (CLS) containers.
- Guarantee **95–100 Google Lighthouse** scores across Performance, Accessibility, Best Practices, and SEO.

---

## 2. System Topology & Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Existing Shared Hosting                     │
│  Domain: cms.studybhai.com                                  │
│  - Runs WordPress solely for admin & media uploads          │
│  - Exposes REST API: /wp-json/wp/v2/                        │
│  - CPU/Memory load reduced by >95%                          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                On Post Publish / Update:
                Webhook triggers Cloudflare Build Hook
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Cloudflare Pages (Free Tier)                │
│  - Runs Astro 5 Build: `npm run build`                      │
│  - Fetches posts, books, notes & guides via REST API        │
│  - Runs Pagefind: `npx pagefind --site dist`                │
│  - Compiles 100% static HTML, CSS & minimal JS              │
└──────────────────────────────┬──────────────────────────────┘
                               │
                Instant Global Edge Distribution
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                  Students at studybhai.com                  │
│  - Sub-50ms TTFB across Pakistan via Cloudflare Edge        │
│  - Instant offline-ready client-side search                 │
│  - Smooth Astro View Transitions                            │
│  - Immune to shared hosting downtime                        │
└─────────────────────────────────────────────────────────────┘
```

### DNS & Domain Routing
- **`studybhai.com`**: CNAME to Cloudflare Pages project.
- **`cms.studybhai.com`**: A Record pointing to the existing shared hosting IP address.
- **SSL**: Managed automatically by Cloudflare with full TLS encryption.

---

## 3. URL Structure & SEO Redirection Strategy
To preserve all historical Google search rankings, backlinks, and authority, the URL hierarchy mirrors WordPress permalinks:

| Page / Resource | URL Pattern | Description |
| :--- | :--- | :--- |
| **Home** | `/` | Complete landing page with hero, subject explorer, metrics, testimonials, and latest guides |
| **Books Hub** | `/books/` | Archive of all PTB & Federal Board books |
| **Class Books** | `/books/class-[9\|10\|11\|12]/` | Filtered textbooks for specific grades |
| **Notes Hub** | `/notes/` | Chapter-wise study notes archive |
| **Class Notes** | `/notes/class-[9\|10\|11\|12]/` | Class-specific notes (e.g. Class 12 Math) |
| **Past Papers** | `/past-papers/` | Board exam papers archive |
| **Student Guides** | `/guides/` | USAT, HEC, and career preparation articles |
| **Scholarships** | `/scholarships/` | Domestic & international scholarship guides |
| **Single Post / Note** | `/[slug]/` | Exact match to WordPress post slugs (e.g. `/class-12-math-notes/`) |
| **About Us** | `/about/` | Story, mission, UN SDG Goal 4 focus |
| **Contact Us** | `/contact/` | Contact details and inquiry form |
| **Privacy Policy** | `/privacy-policy/` | Required for Google AdSense compliance |
| **Terms of Service** | `/terms/` | Terms and educational disclaimer |

---

## 4. Content Schema & API Client

### 4.1 WordPress REST API Integration (`src/lib/wordpress.ts`)
- **Base Endpoint**: `import.meta.env.WORDPRESS_API_URL || 'https://cms.studybhai.com/wp-json/wp/v2'`
- **Key Methods**:
  - `getAllPosts()`: Fetches published posts with embedded media (`_embed=1`), categories, and author metadata. Handles pagination automatically.
  - `getPostBySlug(slug: string)`: Fetches a single post by slug for static route generation.
  - `getCategories()`: Fetches category taxonomies (`ptb-books`, `notes`, `past-papers`, `student-guides`, `scholarships`).
  - `getPostsByCategory(categorySlug: string)`: Filters resources for section landing pages.

### 4.2 Offline & Dev Resilience (`src/data/mockData.ts`)
To allow seamless local development and guarantee that build pipelines never fail if the shared hosting is temporarily unreachable or rate-limited:
- A high-fidelity mock dataset with authentic Pakistani educational data (Class 9–12 Math, Physics, Chemistry notes, PTB books, HEC scholarship guides) is included.
- If `fetch()` to WordPress times out or errors during development, Astro gracefully falls back to cached data.

---

## 5. Visual Design System & Aesthetics
The design keeps the familiar layout of Study Bhai while upgrading it to a **"premium ed-tech startup"** standard.

### 5.1 Color Palette
- **Deep Academic Slate (Primary)**: `#1F2E2B` (used for headers, footers, and dark accents)
- **Vibrant Emerald (Brand Accent)**: `#059669` / `#10B981` (CTA buttons, active chips, badges)
- **Warm Gold/Amber (Highlight)**: `#F59E0B` (ratings, review stars, SDG goal badge)
- **Background Slate**: `#F8FAFC` (soft off-white for maximum reading comfort)
- **Surface Cards**: `#FFFFFF` with refined subtle borders `1px solid #E2E8F0` and micro-drop shadows

### 5.2 Typography
- **Headings**: `Space Grotesk` (Google Font) — crisp, geometric, modern startup feel.
- **Body & Notes**: `Inter` (Google Font) — clean readability for mathematical formulas and long guides.

### 5.3 Micro-Interactions & Transitions
- Astro View Transitions for instant, app-like page switches without page flashes.
- Interactive grade selector pills (`9th`, `10th`, `11th`, `12th`) with active state animations.
- Hover lift on resource cards with border glow.
- Quick Search modal triggered globally via `Ctrl+K` (or `Cmd+K` on Mac) and `/`.

---

## 6. Component Architecture

### 6.1 Layouts & Core Components
1. **`src/layouts/Layout.astro`**: Main HTML shell, SEO head injection, fonts, navigation header, search modal, and footer.
2. **`src/components/Header.astro`**: Sticky navbar, responsive logo, primary navigation dropdowns (Books, Notes, Past Papers, Guides, Scholarships), search trigger button, and animated mobile navigation drawer.
3. **`src/components/Footer.astro`**: Dark forest gradient footer with newsletter signup, category links, social channels, copyright, and policy links.
4. **`src/components/Hero.astro`**: Premium ed-tech hero with 3D illustration badge, UN SDG Goal 4 indicator, live student metrics counter (15+ Subjects, 500K+ Students), quick search bar, and grade filter chips.
5. **`src/components/ResourceCard.astro`**: Versatile card component displaying subject icon, class badge, title, excerpt, verified download button, and view counter.
6. **`src/components/DownloadBox.astro`**: Prominent, high-trust PDF download widget with file size badge, official board indicator (Punjab Textbook Board / Federal Board), and direct download link.
7. **`src/components/TableOfContents.astro`**: Sticky chapter navigation for long study guides and note collections to maximize reading engagement.
8. **`src/components/SearchModal.astro`**: Fast client-side search overlay powered by Pagefind with keyboard navigation.
9. **`src/components/AdUnit.astro`**: Zero-CLS Google AdSense wrapper with fixed min-heights and lazy script initialization.
10. **`src/components/SEO.astro`**: OpenGraph, Twitter Cards, canonical tags, and structured JSON-LD schemas (`EducationalWebSite`, `Article`).

---

## 7. Search, Dynamic Features & Monetization

### 7.1 Pagefind Search Integration
- Built into the static output: `npx pagefind --site dist`.
- Zero backend server cost, 0 database overhead.
- Indexes all titles, headings, and excerpts.
- Search queries execute directly in the browser via WebAssembly in under 15ms.

### 7.2 Zero-CLS Google AdSense Architecture
- Ad containers reserve standard IAB dimensions before ad scripts execute:
  - Top Banner: `min-height: 90px; max-width: 728px;`
  - In-Content Card: `min-height: 250px; max-width: 300px;` or `min-height: 280px; max-width: 336px;`
  - Footer Anchor: `min-height: 90px;`
- Ad scripts are loaded with `async` and `data-ad-client` dynamically after initial DOM paint to prevent blocking First Contentful Paint (FCP).

### 7.3 Form Handling (Contact & Newsletter)
- **Contact Form**: Uses client-side AJAX submitting to a free zero-backend provider (e.g. Web3Forms or Formspree free tier) with feedback states (loading, success, error).
- **Newsletter**: Async email submission with instant visual confirmation.

---

## 8. Deployment & Webhook Setup

### 8.1 Cloudflare Pages Configuration
- **Build Command**: `npm run build && npx pagefind --site dist`
- **Build Output Directory**: `dist`
- **Environment Variables**:
  - `WORDPRESS_API_URL`: URL of the headless WordPress instance (e.g., `https://cms.studybhai.com/wp-json/wp/v2`).

### 8.2 Instant Rebuild Webhook
- Create a Deploy Hook in Cloudflare Pages settings (generates a unique trigger URL).
- In WordPress `wp-admin`, install the lightweight *WP Webhooks* plugin or add a hook in `functions.php`:
  ```php
  add_action('publish_post', function($post_id) {
      wp_remote_post('https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/YOUR_HOOK_ID');
  });
  ```
- Any newly published or modified note triggers an automated Cloudflare Pages build.

---

## 9. Verification & Quality Gates
Before considering the rebuild production-ready:
1. **Lighthouse Audit**: Verify Performance (≥95), Accessibility (≥95), Best Practices (≥95), SEO (100).
2. **Pagefind Search**: Verify instant keyword search for typical student queries ("Class 12 Math", "Physics 9th", "USAT").
3. **Core Web Vitals Check**: Verify CLS is < 0.05, LCP is < 1.8s, and FID/INP is < 100ms.
4. **Mobile Responsiveness**: Test across standard mobile screen widths (360px, 390px, 412px, 768px, 1024px, 1280px+).
5. **PDF Links & Download Boxes**: Verify all download triggers and media links function seamlessly.
