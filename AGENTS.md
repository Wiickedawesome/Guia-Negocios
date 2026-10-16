## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

**Repo-specific docs live in `docs/`** — read `docs/00-AI-AGENT-GUIDE.md` first, then
`docs/04-firebase-and-cms.md` (Firestore collections, App Check, secret storage) and
`docs/05-development-and-deployment.md` (build credentials, deploy).

## Project invariants

- **Locales:** Spanish home is served at `/`; Spanish **subpages** live under `/es/*` (e.g.
  `/es/services/`, `/es/faq/`), English under `/en/*`. Only `/es` and `/es/` themselves 301 to `/`,
  and the unprefixed `/services/`, `/about/`, `/blog/`, `/faq/` 301 to their `/es/...` equivalents.
  All intentional — do not "fix" it, and do not assume every `/es/*` path redirects.
- **Do not dedupe `seoSchemas` by keyword.** Two writers used different document-id schemes, so
  every keyword has two documents: the backfill script slugifies spaces to hyphens, while
  `scheduledAeoInjector` left spaces intact because of a broken `/\\s+/g` regex (that function has
  since been removed). The pairs look like duplicates but hold *different* questions. Collapsing
  them silently deletes content from the homepage. Attempted and reverted twice.
- **App Check is enforced on the callable Cloud Functions in code**, via
  `enforceAppCheck: true`. The Firebase console cannot enforce it for Cloud Functions.
- **Never read an API key from `import.meta.env.PUBLIC_*`** — Astro inlines those into
  the client bundle. Keys come from `settings/admin` in Firestore.
- **Admin pages may not work on `localhost`** (App Check). Verify admin UI on the live
  domain.
- **Never publish service prices** — no dollar amounts, fee tables, or per-tier pricing
  anywhere (site, blog, landing pages). Pricing is discussed only in consultations.
- **Never render unsourced outcome statistics** (success %, revenue multiples) in copy or
  visuals unless the number is verifiable and sourced.

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
- When generating or updating blog posts, ensure that each post uses a unique cover image (e.g., from Pexels or Unsplash) to avoid repeated images across the blog.
