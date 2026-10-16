# Repository Utility Scripts

Operator tools for the **Guia Negocios** site and Firebase project (`guianegocios-prod`).
None of these run in the build or in Cloud Functions.

## Production verification

| Script | Purpose |
| --- | --- |
| `smoke-test-production.mjs` | Production smoke test (pages, redirects, robots, headers). `node scripts/smoke-test-production.mjs` |
| `verify-firestore-rules.cjs` | Verifies the deployed Firestore rules match the repo copy; exits non-zero on drift. |
| `check-deployed-rules.cjs` | Prints the rules currently deployed to `guianegocios-prod`. |
| `search-console-audit.sh`, `searchconsole-audit.sh` | Google Search Console API audit helpers (used for the 2026-10 audit passes; need GSC credentials). |
| `ping-indexnow.sh` | Pings IndexNow with sitemap URLs after content changes. |

## Content tooling

| Script | Purpose |
| --- | --- |
| `check-posts-status.mjs` | Lists Firestore blog posts with status/dates. |
| `fetch-blogs.js`, `list-blogs.js` | List blog titles/slugs (local client credentials from `.env` — local tooling only). |
| `create-blog-posts.mjs`, `load-blog-content.mjs` | Draft-pipeline helpers paired with `scripts/post-content/*.md`. |
| `generate-og-images.js`, `generate-gold-favicons.cjs` | Regenerate `public/images/og/` and favicons. |
| `generate-infographics.mjs` | Injects infographic HTML into a post's `contentEs` **only** (the HTML is Spanish; EN bodies are never touched). |
| `update-ein-image-admin.js` | Updates the EIN post image through the admin flow. |

## Historical — do NOT re-run

| Script | Why |
| --- | --- |
| `backfill-aeo-schemas.mjs` | Already ran. Re-running duplicates `seoSchemas` documents, and the two id schemes in Firestore are intentional (see `AGENTS.md`). |
| `update-ein-post.js` | Targets Firestore anonymously — cannot work now that App Check and rules block unauthenticated writes. |
| `update-postN-visuals.mjs` (1–4) | **Deleted** — they set posts back to `status: 'draft'`, which would unpublish live posts. |

`scripts/post-content/` holds the markdown/HTML sources used by the content tooling; `blog-posts-data.json` is its data file.
