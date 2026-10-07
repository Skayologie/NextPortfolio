# Portfolio audit implementation — 6 October 2026

Branch: `fix/portfolio-audit`
Base: `b4fad0e166435d4257c173910048fd42d47615ae`

## Implemented

- Removed the blocking three-second introduction from the public layout.
- Unified the canonical origin to `https://www.jawadboulmal.com`, including a host-specific permanent redirect that preserves paths and queries, sitemap, RSS and AI reference files.
- Scoped the homepage Person/ProfilePage/project schema to the homepage. Removed the invisible FAQ and speculative name variants. Project schema uses the same data getter as the UI and avoids incorrect platform/language assertions.
- Added `/projects` and individual project detail pages with their own metadata, safe Markdown rendering, and real navigation links. Summaries are limited to 55 words; existing full descriptions are preserved on detail pages. URLs derive from project titles: changing a title changes its URL, so add a redirect if renaming a published project.
- Removed generic GitHub profile destinations from project actions, labeled repository links as source code and external Source links as live demos. No missing repository URL was invented.
- Magazine template: projects below the hero; project/contact actions; stable image aspect ratios; readable section headings and numbered experience; removed empty education anchors; email alternative to the form.
- All template project previews use concise plain-text summaries and link titles to detail pages. Below-the-fold template images load lazily. Known skills prefer bundled SVG icons over fragile external logos.
- Updated the fallback biography to reflect DabaDoc; prioritized ongoing work entries ahead of completed roles.
- Added accessible pagination names/current-page state/44px controls, a named theme toggle, visible keyboard focus, form autocomplete/result announcements, and reduced-motion configuration. Hero/section reveal components start visible so JavaScript is not required to read them.
- RSS now includes all seven posts with XML escaping. Removed duplicate article H1s and repaired missing fallback article share-image URLs.
- Dashboard project mutations invalidate project listing/detail pages and the sitemap.

## Validation

- `npm ci --no-audit --no-fund` succeeded without dependency changes.
- TypeScript and ESLint on modified application files passed.
- Production build completed with system TLS certificates enabled for Google Fonts. The build environment has intermittent remote font retrieval failures; no certificate validation was disabled.
- HTTP regression checks passed on 7 October 2026 against the production build: summaries, links, seven RSS entries, sitemap, host redirect, canonical URLs, schema scope, single H1, project routes and missing-project 404.
- `tests/portfolio-routes.mjs` verifies summaries, action destinations, feed entries, sitemap/canonical URLs, redirects, schema scope, single H1, project routes and missing-project 404. Run with Node 22.18+ (native TypeScript stripping) against a running production server, using `TEST_BASE_URL` if required.
- `tests/portfolio-audit.mjs` adds browser layout checks at 360/390/768/1440px and a no-JavaScript check. **Not executed successfully here:** Chromium download failed in this environment. Install Chromium using Playwright before running it.
- No real contact message was sent; no production database or deployment was changed.

## Before publishing

1. Inspect the Magazine template using real Supabase content on a preview deployment; confirm mobile, dark mode, image crops and keyboard focus. Check fresh mobile/desktop Lighthouse results. No new performance score is claimed by this patch.
2. Update the About row in the dashboard: it overrides the fallback biography. Suggested factual copy:

   > I am a Full Stack Developer at DabaDoc in Casablanca, building features with Ruby on Rails, Angular and React. My experience also includes working on Qarib at MediaVerse with Nest.js, Next.js and Flutter, and building backend projects with Java and Spring Boot. I enjoy turning complex requirements into reliable, usable web applications.

3. Confirm education completion status and normalize dates/language in dashboard-managed experience and education. Do not infer a graduation date or an ambiguous month/year.
4. Provide/verify direct SmartShop and L’7sab application/repository URLs in the dashboard. Incorrect profile actions are currently hidden. The restaurant description/image remain managed in Supabase, not this repository's fallback dataset.
5. Add first-hand case-study material: project context, personal/team/client status, exact role, decisions, screenshots and demonstrable results. The new detail pages render existing descriptions; they do not invent business outcomes or claim paid client work.
6. Test contact delivery explicitly in a staging environment and review the existing 24-hour cooldown behavior.
7. Search Console access is still needed to measure real queries/rankings and inspect Google's chosen canonical after publishing. Neither first place for “Jawad B” nor AI recommendations are guaranteed.

## Apply the patch

From a clean checkout at the base commit (or review conflicts against a newer branch):

```sh
git switch -c fix/portfolio-audit
git apply --check /path/to/portfolio-audit.patch
git apply /path/to/portfolio-audit.patch
npm ci
npm run build
```

Review before merging or deploying. This patch does not contain environment variables, credentials or database migrations.
