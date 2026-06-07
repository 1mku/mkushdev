# Improvements Plan

## 🔴 High Priority (bugs & security)

1. **Hardcoded PostHog API key** — `src/components/Posthog.astro:4`
   - `phc_dGluPpkr5dSplv8C74Qxpwx6wYyzeuDi5jGv4HWeVAo` is baked into source. `api_host` also hardcoded.
   - **Fix:** Move to env vars (`PUBLIC_POSTHOG_KEY`, `PUBLIC_POSTHOG_HOST`).

2. **Hardcoded GTM ID** — `src/components/GA.astro`
   - `GTM-KP4SRMMP` hardcoded even though `PUBLIC_GTM_ID` env var exists.
   - **Fix:** Use `import.meta.env.PUBLIC_GTM_ID`.

3. **`pnpm-workspace.yaml` placeholder values**
   - `allowBuilds` entries contain strings `"set this to true or false"` instead of booleans.
   - **Fix:** Set actual `true`/`false` values or remove the entries.

## 🟡 Medium Priority (code quality & content)

4. **Placeholder content** — `projects/etl-group.md` & `projects/smart-chem.md`
   - Both contain boilerplate "Hi there!" text. Needs real portfolio content.

5. **`PostCard.astro` unused CSS**
   - Defines `.card` class styles but template uses `.link-card`. Dead code.
   - **Fix:** Remove unused styles or align class names.

6. **`Card.astro` / `PostCard.astro` style duplication**
   - Both define identical `.card` styles (~15 lines each).
   - **Fix:** Extract shared styles or refactor `PostCard` to use `Card` component.

7. **Unused PostCSS dependencies**
   - `@tailwindcss/postcss`, `autoprefixer`, `postcss` in `devDependencies` — unused with Tailwind v4 Vite plugin.
   - **Fix:** Remove from `package.json`.

8. **`PostCard` uses `any` type** — `src/pages/projects/index.astro:14`
   - `projects.map((p: any) => ...)` bypasses content collection schema.
   - **Fix:** Use proper type from `astro:content`.

9. **`.prettierignore` too restrictive**
    - Ignores everything except `src/` and a few dotfiles. `astro.config.mjs`, `.env.example`, `pnpm-workspace.yaml` excluded.
    - **Fix:** Broaden scope or remove file to use defaults.

## 🟢 Lower Priority (enhancements & new features)

10. **OG / social share meta tags**
    - No Open Graph or Twitter Card tags in `BaseLayout.astro`.
    - **Fix:** Add `og:title`, `og:description`, `og:image`, `twitter:card` meta tags.

11. **Sitemap generation**
    - **Fix:** Add `@astrojs/sitemap` integration.

12. **No 404 page**
    - **Fix:** Add `src/pages/404.astro` with custom error content.

13. **Vite major upgrade** — `vite 7.3.3 → 8.0.16`
    - Breaking changes. Needs careful testing.

14. **Duplicate favicon link** — `BaseLayout.astro:15` & `:18`
    - Both link `/favicon/favicon.ico`. Line 15 should use `.svg` favicon instead.

15. **Analytics consolidation**
    - 3 services: GTM, GA (via GTM), PostHog. Evaluate if all are needed.

16. **Marquee triple-render DOM bloat**
    - Skills.astro (15 icons) × 3 renders = 45 DOM nodes. Acceptable now but worth noting for future.

17. **Responsive typography on `html` font-size**
    - Root `font-size` changes 12→20px across breakpoints, cascading into all `rem` values.
    - **Fix:** Use a typographic scale on text elements instead.

18. **CSS variables duplication**
    - Design tokens defined in `BaseLayout.astro` `<style is:global>`, duplicated across components.
    - **Fix:** Move all tokens to a single `tokens.css`.

19. **CI/CD pipeline**
    - No CI at all. GitHub Actions for lint/typecheck on PRs would prevent regressions.

20. **Image optimization**
    - No `@astrojs/image` integration. Project images won't be optimized.
