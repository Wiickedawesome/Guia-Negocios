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

- **Spanish is served at the site root** (`/`), English at `/en/`. `/es/*` 301s to `/`
  by design — do not "fix" it.
- **Do not dedupe `seoSchemas` by keyword.** The generator writes each keyword twice
  (space-form and hyphen-form document ids). The pairs look like duplicates but hold
  *different* questions. Collapsing them silently deletes content from the homepage.
  Attempted and reverted twice.
- **App Check is enforced on the callable Cloud Functions in code**, via
  `enforceAppCheck: true`. The Firebase console cannot enforce it for Cloud Functions.
- **Never read an API key from `import.meta.env.PUBLIC_*`** — Astro inlines those into
  the client bundle. Keys come from `settings/admin` in Firestore.
- **Admin pages may not work on `localhost`** (App Check). Verify admin UI on the live
  domain.

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
- When generating or updating blog posts, ensure that each post uses a unique cover image (e.g., from Pexels or Unsplash) to avoid repeated images across the blog.
