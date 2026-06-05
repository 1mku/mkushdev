# AGENTS.md — Project Analysis

## Overview

**1mku.dev / mkush.dev** — Personal portfolio & link-in-bio site for **Mike Kushchov** (Full-Stack Developer).

Built with [Astro](https://astro.build) v6 (static site generator), styled with Tailwind CSS v4 + hand-rolled CSS, deployed as a fully static site via Cloudflare Pages (inferred from CSP config).

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | [Astro](https://astro.build) | 6.3.3 |
| CSS | Tailwind CSS | 4.3.0 |
| Styling | Tailwind + vanilla CSS (reset, typography, layout) | — |
| Icons | Font Awesome 6 (brands, solid via `/public/fa/`) | — |
| Fonts | Google Fonts — Silkscreen (headings), Roboto (body) | — |
| Language | TypeScript (strict) | 6.0.3 |
| Package Manager | pnpm | — |
| Node.js | 24.15.0 | — |
| Linting | ESLint | 10.4.0 |
| Formatting | Prettier | 3.8.3 |

---

## Project Structure

```
.
├── public/                          # Static assets served as-is
│   ├── fa/                          # Font Awesome CSS (brands.min.css, solid.min.css, fontawesome.min.css)
│   ├── favicon/                     # Favicon assets (png, ico, webmanifest)
│   └── webfonts/                    # Font Awesome font files (ttf, woff2)
├── src/
│   ├── components/                  # Astro UI components
│   │   ├── Card.astro               # Reusable card wrapper with hover effect
│   │   ├── CSP.astro                # Content Security Policy meta tag component
│   │   ├── GA.astro                 # Google Analytics (GTM) inline script
│   │   ├── Marquees.astro           # Infinite scrolling marquee animation
│   │   ├── PostCard.astro           # Project listing card with link
│   │   ├── Posthog.astro            # PostHog analytics client-side init
│   │   └── Skills.astro             # Tech skill icons (inline SVGs, marquee content)
│   ├── layouts/
│   │   └── BaseLayout.astro         # Root HTML layout (head, meta, fonts, analytics, styles)
│   ├── pages/
│   │   ├── index.astro              # Home page — intro + skill marquee
│   │   └── projects/
│   │       ├── index.astro          # Portfolio listing (from content collections)
│   │       └── [id].astro           # Dynamic project detail page
│   ├── styles/
│   │   ├── global.css               # Tailwind CSS v4 import (@import "tailwindcss")
│   │   ├── reset.css                # Minimal CSS reset (box-sizing, margins, list-style)
│   │   └── styles.css               # Typography scale (responsive font-size)
│   ├── content.config.ts            # Astro content collections config
│   └── env.d.ts                     # TypeScript env types (PUBLIC_GTM_ID)
├── projects/                        # Markdown content (content collection source)
│   ├── etl-group.md                 # Example project: ETL Group (tags: corporate)
│   └── smart-chem.md                # Example project: SmartChem (tags: e-commerce)
├── astro.config.mjs                 # Astro configuration
├── tsconfig.json                    # TypeScript config (strict, path aliases @/ → ./src/)
├── package.json                     # Dependencies & scripts
├── pnpm-workspace.yaml              # pnpm workspace config
├── .eslintrc.cjs                    # ESLint config (TS, prettier integration)
├── .prettierrc                      # Prettier config (4-space tabs, single quotes, 80 width)
└── .env.example                     # Environment variable template (PUBLIC_GTM_ID)
```

---

## Architecture & Key Decisions

### Static Site with Content Collections
- Uses Astro's [content collections](https://docs.astro.build/en/guides/content-collections/) to load Markdown files from `projects/` as a `projects` collection.
- Schema validates `title`, `tags`, and optional `image` fields via Zod.
- Projects are statically rendered at build time — `[id].astro` generates one page per project via `getStaticPaths()`.

### Styling Approach
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no PostCSS config needed for v4).
- **Vanilla CSS** for global typography (`styles.css` with responsive font-size scale from 12px→20px).
- **CSS Reset** (`reset.css`) — minimal box-sizing & margin reset.
- **Component-level styles** in Astro `<style>` blocks (scoped by default).
- Dark theme (black background, white text) with CSS custom properties for the color palette (`--background`, `--accents-1` through `--accents-8`, `--text-primary`).

### Analytics (3 services)
1. **Google Tag Manager** — `GA.astro` (inline script, GTM ID from `PUBLIC_GTM_ID` env var).
2. **PostHog** — `Posthog.astro` (client-side init, runs only in production via `import.meta.env.PROD`).
3. **Partytown** — Astro integration (`@astrojs/partytown`) for offloading GTM to a web worker.

### Security
- **Content Security Policy** — `CSP.astro` generates a strict CSP meta tag covering: `default-src`, `script-src`, `style-src`, `img-src`, `font-src`, `connect-src`, `worker-src`.
- Allowlisted origins: Cloudflare Insights, Google Tag Manager, Google Analytics, PostHog, Google Fonts.

### Performance
- Static site — zero server runtime.
- Partytown offloads analytics scripts to web workers.
- Font Awesome CSS hosted locally in `public/fa/` (no CDN dependency for icons).
- Fonts loaded from Google Fonts with `preconnect` hints.
- Tailwind v4 tree-shakes unused CSS at build time.

---

## Key Scripts (from package.json)

| Script | Command |
|--------|---------|
| `dev` / `start` | `astro dev` |
| `build` | `astro check && astro build` |
| `preview` | `astro preview` |
| `format` | `prettier --write . --plugin=prettier-plugin-astro` |
| `lint` | `eslint .` |
| `ts-check` | `tsc` |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_GTM_ID` | Google Tag Manager container ID (public, exposed to client) |

---

## Components Guide

### Layouts
- **`BaseLayout.astro`** — Root HTML shell. Sets dark theme CSS vars, loads fonts (Silkscreen + Roboto), injects analytics (PostHog + GTM + Partytown), applies CSP, renders `<slot />`.

### Pages
- **`index.astro`** — Hero: "Hello, I'm Mike!" + "Full-Stack Developer" tagline → social icons (LinkedIn, GitHub) → skill icons marquee.
- **`projects/index.astro`** — Grid listing of all project cards from content collection.
- **`projects/[id].astro`** — Individual project detail page rendering the Markdown content with `astro-portabletext`.

### UI Components
- **`Card.astro`** — Bordered card with subtle hover effect (background tint).
- **`PostCard.astro`** — Project link card (title + arrow).
- **`Marquees.astro`** — Infinite scrolling horizontal animation (CSS keyframes, 20s loop, gradient fade mask on edges). Triples the slot content for seamless loop.
- **`Skills.astro`** — 15 tech skill icons as inline SVGs (TypeScript, Node.js, Tailwind, React, Next.js, Figma, Astro, JavaScript, Kotlin, Vue, Flutter, Svelte, Laravel, etc.).

### Analytics & Security Components
- **`GA.astro`** — Google Tag Manager inline script.
- **`Posthog.astro`** — PostHog JS SDK init (production only).
- **`CSP.astro`** — Generates Content-Security-Policy meta tag.

---

## Content Management

Content is managed via **Markdown files** in `projects/` with frontmatter:

```yaml
---
title: Project Name
tags: ['corporate', 'web']
image: /path/to/image.png  # optional
---
```

Each file generates its own page at `/projects/<filename-without-ext>/`.

---

## Tooling & Editor Setup

- **VSCode** recommended with `astro-build.astro-vscode` extension.
- Default formatter set to Prettier.
- ESLint configured for TypeScript + Prettier integration.
- Prettier: 4-space tabs, single quotes, 80-char print width.
- `.node-version` pins Node.js to 24.15.0.

---

## Git History Highlights

```
chore: bump dependencies
Update csp headers
Add projects link, background color fix
Add Posthog
Add marquees mask
Add tailwind
eslint & prettier basic configuration
```

The project evolved from a simple page → added Tailwind → marquee animations → PostHog analytics → GTM → content collections for projects → CSP hardening.

---

## Potential Improvements / Notes for Agents

1. **Content is placeholder** — Both project Markdown files contain boilerplate "Hi there!" text. Needs real portfolio content.
2. **No sitemap or RSS** — Consider adding `@astrojs/sitemap` for SEO.
3. **No image optimization** — No `@astrojs/image` integration; project images in Markdown won't be optimized.
4. **PostHog key is hardcoded** — `phc_dGluPpkr5dSplv8C74Qxpwx6wYyzeuDi5jGv4HWeVAo` is baked into `Posthog.astro`. Consider moving to env var.
5. **GTM env var** is `PUBLIC_GTM_ID` but no `.env` file exists with a real value — only `.env.example`.
6. **No Open Graph / social share tags** — BaseLayout could benefit from OG meta for social sharing.
7. **`Card.astro` component has unused CSS** — defines `.card` class styles but PostCard.astro duplicates similar styles (could refactor into shared).
8. **Marquee triple-render** — `Marquees.astro` renders `<slot />` 3× for seamless loop; if content is heavy this multiplies DOM size.