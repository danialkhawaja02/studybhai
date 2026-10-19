# Study Bhai — Cadmus-Inspired Visual Re-architecture Specification

- **Date:** 2026-10-19
- **Author:** Antigravity & User Pair Programming
- **Topic:** Frontend Design System, Typography, Floating Header, and Interactive Component Overhaul Inspired by Cadmus.io
- **Status:** Approved for Implementation Planning

---

## 1. Problem Statement & Motivation

The initial Astro 5 rebuild established a functional SSG pipeline, dynamic WordPress routes, and zero-CLS AdSense containers. However, user review identified critical design and user experience shortcomings:
1. **Color Scheme & Atmosphere:** The previous dark green/slate palette created a harsh, disconnected contrast with blinding white content sections, failing to match modern ed-tech aesthetics.
2. **Congested Header & Poor Spacing:** Desktop navigation crammed 8 links into a tight bar with insufficient breathing room, creating an awkward, cluttered visual hierarchy.
3. **Lack of Motion & "Startup Polish":** Static cards, rigid layouts, and boxy containers felt like an amateur minimum viable product rather than a state-of-the-art educational platform like Cadmus.io (`https://cadmus.io/`).

---

## 2. Design Vision: The Cadmus Aesthetic for Study Bhai

Cadmus represents the gold standard in premium academic web design: warm, human, deeply professional, and alive with subtle motion. This redesign ports Cadmus's core design language directly into Study Bhai while preserving all verified Punjab Textbook Board (PTB) resources, chapter notes, and past papers.

### 2.1 The Cadmus Color Palette & Design Tokens

| Token Name | Hex Value | Role & Usage |
|---|---|---|
| `--color-wine` | `#580C1D` | Primary academic ruby/wine for Hero, CTA buttons, and Footer |
| `--color-wine-dark` | `#3D0714` | Deep gradient background for Hero atmosphere |
| `--color-bg-parchment` | `#FCF7EF` | Warm cream parchment background (eliminates stark `#FFFFFF`) |
| `--color-surface` | `#FFFDFB` | Card backgrounds, panels, and floating island header |
| `--color-peach` | `#FFC8AE` | Warm apricot/peach accent for hero highlights and badges |
| `--color-peach-light` | `#FFE7DB` | Soft peach tint for value proposition cards and callouts |
| `--color-vellum-border` | `#CFC0B0` | Delicate vellum borders (`1px solid` and `1px dashed`) |
| `--color-text-main` | `#04191F` | High-contrast charcoal text for effortless reading |
| `--color-text-muted` | `#5E6B6E` | Neutral secondary text for subtitles, dates, and metadata |
| `--color-tag-pink` | `#FFC3F0` | Pastel badge for Scholarships & Guides |
| `--color-tag-blue` | `#B6DBFF` | Pastel badge for Physics & Computer Science |
| `--color-tag-green` | `#D1E375` | Pastel badge for Biology & Environmental Studies |
| `--color-tag-lavender` | `#C5C5FF` | Pastel badge for English, Urdu & Pak Studies |
| `--color-tag-yellow` | `#FFE388` | Pastel badge for Chemistry & Mathematics |

### 2.2 Typography System

- **Primary Sans Body & UI:** `Inter, -apple-system, BlinkMacSystemFont, sans-serif` (clean, highly readable).
- **Display & Headings:** `Space Grotesk, Inter, sans-serif` (modern neo-grotesque authority).
- **Editorial Italic Accent:** `STIX Two Text, serif` with `font-style: italic` (used sparingly in hero titles and key phrases to add literary elegance, e.g. `Quality Education for <span class="italic-serif">Pakistani Students</span>`).
- **Small Uppercase Labels:** `font-size: 12px; letter-spacing: 0.05em; font-weight: 600; text-transform: uppercase;` with pastel background pills.

---

## 3. Component Architecture & Structural Specifications

### 3.1 Floating Island Header (`src/components/Header.astro`)
- **Structure:**
  - A detached pill island centered at top of viewport:
    ```css
    max-width: 920px;
    margin: 20px auto;
    border-radius: 12px;
    background-color: var(--color-surface);
    box-shadow: 1px 8px 16px 0 hsla(26, 28%, 75%, 0.18);
    border: 1px solid rgba(207, 192, 176, 0.4);
    padding: 12px 24px;
    position: sticky;
    top: 16px;
    z-index: 100;
    ```
- **Elements:**
  - **Left:** Refined Study Bhai logo with academic icon.
  - **Center:** De-cluttered primary navigation with 4 high-value links:
    - Punjab Books (`/books/`)
    - Chapter Notes (`/notes/`)
    - Past Papers (`/past-papers/`)
    - Scholarships (`/scholarships/`)
  - **Right:**
    - Quick Search Button (`Ctrl+K` shortcut indicator).
    - Primary CTA Button: Wine background (`#580C1D`), rounded corners, white text ("Explore Resources").
- **Mobile Responsive Drawer:**
  - Collapses smoothly into a clean bar with brand logo, search icon, and animated hamburger toggle.
  - Hamburger toggle slides down a spacious accordion menu with large touch targets and zero crowding.

### 3.2 Hero Section with 4-Card Floating Showcase (`src/components/Hero.astro`)
- **Atmosphere:**
  - Deep rich wine background (`#580C1D` to `#3D0714`) with a warm apricot ambient glow.
- **Content Hierarchy:**
  1. Eyebrow badge: Peach pill (`#FFE7DB`) with UN SDG 4 Quality Education focus.
  2. Headline: Two-tone typography with italic serif flourish:  
     `Empowering Tomorrow's Achievers with <span class="italic-serif">Quality Education</span>`.
  3. Lead paragraph in warm peach (`#FFE7DB`) emphasizing free access to all Punjab Curriculum textbooks and board position holder notes.
  4. Instant search bar with glowing vellum border and quick filter pills (`Class 9`, `Class 10`, `Class 11`, `Class 12`).
  5. Live Metrics Bar: Floating parchment card with `500,000+ Students`, `15+ Subjects`, `100% Free Forever`.
- **Interactive 4-Card Showcase:**
  - Replaces the generic dark box with an interactive 4-card stack/grid featuring real textbooks:
    - Card 1: *Class 9 Physics (PTB)* — Badge: `#D1E375` (Lime)
    - Card 2: *Class 10 Biology (PTB)* — Badge: `#B6DBFF` (Soft Blue)
    - Card 3: *Class 11 English (PCTB)* — Badge: `#C5C5FF` (Lavender)
    - Card 4: *Class 12 Mathematics (Solved)* — Badge: `#FFC8AE` (Peach)
  - Cards feature soft float animation (`@keyframes float`) and interactive lift on hover (`transform: translateY(-6px)`).

### 3.3 Section Rhythm & Content Flow (`src/pages/index.astro`)
Cadmus achieves its beauty through smooth alternating section backgrounds rather than stark monochromatic blocks:

1. **Wine Hero (`#580C1D`):** Rich atmospheric opening with floating cards.
2. **Top Chapter Notes (Warm Parchment `#FCF7EF`):** Clean 3-column card grid with vellum borders (`1px solid #CFC0B0`), pastel subject pills, author credit, and one-click PDF download badges.
3. **Value Proposition (Light Peach `#FFE7DB`):** Two wide editorial cards featuring large stylized numbers (`01` and `02`), clean typography, and guidance copy.
4. **Interactive Feature Hub (Warm Surface `#FFFDFB`):** 3 feature cards with pastel icon badges (Exam Notes, Board Tips, 24/7 Community).
5. **Punjab Board Textbooks (Warm Parchment `#FCF7EF`):** Official PCTB book downloads with verified seals.
6. **Infinite Animated Marquee:** Infinite linear scroll (`@keyframes scroll`) displaying Punjab Board examination partners (BISE Lahore, Rawalpindi, Gujranwala, Faisalabad, Multan).
7. **Student Testimonials (Warm Parchment `#FCF7EF`):** Floating quote cards with 5-star student reviews and 100% satisfaction score.
8. **Wine Footer (`#580C1D`):** High-contrast peach text (`#FFE7DB`), multi-column clean links, newsletter subscribe box, and social links.

### 3.4 Card & Download Box Polish (`ResourceCard.astro`, `DownloadBox.astro`)
- **Card Background:** `#FFFDFB` with `1px solid #CFC0B0` border and soft shadow `1px 8px 12px hsla(31, 24%, 75%, 0.12)`.
- **Card Badges:** Subject-specific pastel pills (`#B6DBFF`, `#FFC3F0`, etc.) with tight uppercase tracking.
- **Hover Micro-interaction:** `transform: translateY(-4px); box-shadow: 1px 12px 20px hsla(31, 24%, 70%, 0.2); transition: all 0.25s ease;`.
- **DownloadBox:** Pre-allocated dimensions, verified Punjab Board badge, file size indicator, and one-click download button.

---

## 4. Error Handling & Performance Constraints

1. **Cumulative Layout Shift (CLS):** Pre-allocated dimensions on AdUnits and floating containers ensure `0.00 CLS`.
2. **Responsive Breakpoints:**
   - Desktop: `> 990px` (floating island header `max-width: 920px`, 3-column grids).
   - Tablet: `768px – 990px` (2-column grids, spacious padding).
   - Mobile: `< 768px` (single column, full-width header with hamburger drawer, touch-friendly touch targets).
3. **Accessibility:**
   - All text combinations meet WCAG AA contrast standards (minimum `4.5:1` contrast ratio).
   - Visible keyboard focus rings with warm peach glow.
   - `prefers-reduced-motion` media query disables float and marquee animations for sensitive users.

---

## 5. Verification & Testing Strategy

- **Vitest Unit Tests (`tests/`):**
  - Verify global CSS tokens include Cadmus color palette (`#580c1d`, `#fcf7ef`, `#cfc0b0`, `#ffe7db`).
  - Verify Header renders floating island structure, navigation links, and search trigger.
  - Verify Hero renders editorial headline and floating cards.
  - Maintain 100% test pass rate across all 12 test suites.
- **Static Build & Pagefind:**
  - `npm run build` generates all 25 static pages with zero errors.
  - Pagefind static search indexing executes and indexes all pages.
- **Visual Inspection via Local Browser:**
  - Validate spacing, alignment, responsiveness down to 360px mobile width, and smooth micro-animations.
