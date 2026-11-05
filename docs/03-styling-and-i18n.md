# Design Tokens, Styling & Internationalization — Guia Negocios

## 1. Design System & Tokens

Guia Negocios uses a custom Tailwind CSS v4 design system configured in [src/styles/global.css](file:///home/wicked/Projects/Guia%20Negocios/src/styles/global.css).

**This section is the authority.** Any new page, blog post, landing page or service guide must follow it. If a change contradicts this document, fix the change or update this document in the same commit — never leave them disagreeing.

### Colour Palette

| Token | Hex | Classes | Use |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `#1B4E2B` | `bg-brand-primary`, `text-brand-primary` | Primary actions, eyebrows on light, hover fill on tiles |
| **Brand Accent** | `#F0C850` | `bg-brand-accent`, `text-brand-accent` | Gold rule, eyebrows **on dark only**, hover accent text |
| **Brand Dark** | `#1A2E35` | `bg-brand-dark`, `text-brand-dark` | Dark bands, headings on light |
| **Brand Gray** | `#1E2A2F` | `bg-brand-gray` | Rarely used; prefer `brand-dark` |
| **Brand Light** | `#F2F7F4` | `bg-brand-light` | Tile surface |
| **Accent Emerald**| `#10B981` | `bg-emerald-600` | Success toasts only |
| **Accent Amber** | `#F59E0B` | `bg-amber-500` | Warning/pending statuses (admin) |

### ⛔ Retired — do not reintroduce

Each of these was removed during the 2026-11 redesign. Reappearing in **new** work is a regression.

| Retired | Why | Replacement |
| :--- | :--- | :--- |
| Glassmorphism (`bg-white/10 backdrop-blur-md … shadow-xl`) | Made text illegible over photos at 1.5:1 | Solid `bg-brand-dark`, or `bg-brand-light` tile |
| Pill **badges** (`rounded-full` chips for labels/tags) | Read as buttons, mixed radii with real buttons | Small-caps eyebrow (§1.3) |
| Card shadows + hover lift (`shadow-sm hover:shadow-xl hover:-translate-y-1`) | Noise; six stacked surfaces per screen | Flat tile, colour-only hover (§1.4) |
| `rounded-3xl` content cards | Competed with the button radius | Radius 0, or `rounded-[2.5rem]` for tier cards only |
| Centred heroes with gradient washes | Fought the left-aligned editorial rhythm | Left-aligned hero, solid background (§1.2) |
| Gold (`text-brand-accent`) on light backgrounds | 1.61:1 — unreadable | Gold on `brand-dark` only; on light use `brand-primary` |

**Three intentional survivors.** Do not "fix" these:

1. The four **service tier cards** on `/services` keep `rounded-[2.5rem]` + `shadow-sm hover:shadow-xl hover:-translate-y-1.5` plus the raised featured card — the client asked for that surface back explicitly. The CTAs inside them are still pills, and the `MÁS POPULAR` / `MOST POPULAR` flag on the featured card is a `rounded-full … shadow-md` pill.
2. `drop-shadow-xl` on the decorative logo in the closing CTA of `/`, `/about`, `/services` and `/contact`. That is an image shadow, not a card shadow.
3. `drop-shadow-md` on the `<h1>` of blog posts (`blog/[slug].astro`, `blog/view.astro`, both locales). It lifts white type off the hero photo.

**Everything else is migrated.** The six service guide pages and both FAQ pages were also converted on 2026-11-05.

Verify with:

```bash
grep -rn 'rounded-\(sm\|md\|lg\|xl\|2xl\|3xl\)\|shadow-\(sm\|md\|lg\|xl\)' \
  src/pages src/components | grep -v admin
```

The output must be **only** these, and nothing else:

| Where | What | Why it is allowed |
| :--- | :--- | :--- |
| `services.astro` ×4 cards, both locales | `rounded-[2.5rem]`, `shadow-sm`, `hover:shadow-xl` | Exception 1 — tier cards |
| `services.astro` featured card | `rounded-full … shadow-md` pill | Exception 1 — the flagship flag |
| `services.astro` checklist bullets | `w-5 h-5 rounded-full` | Circles, not cards |
| `about.astro`, `index.astro`, `services.astro` | `drop-shadow-xl` on the decorative logo | Exception 2 |
| `blog/[slug].astro`, `blog/view.astro` | `drop-shadow-md` on the post `<h1>` | Exception 3 |
| `contact.astro` | `rounded-2xl` on the status toast | Documented radius for form panels and toasts |
| `Header.astro` | `rounded-2xl` mobile-menu rows, `shadow-lg` on the floating mobile panel | Overlay chrome, not page content |

**Any hit on a tile, band, blog card, panel, plain CTA or button is a regression** — flatten it. Last audited 2026-11-05: 52 hits, every one accounted for above; `rounded-lg`/`rounded-md` count is **0** (the landing-page button, the burger button and the contact toasts were corrected).

### 1.1 Radius Rules

Only three radii exist. Anything else is a bug.

| Radius | Applies to |
| :--- | :--- |
| `rounded-full` | **Every** button, CTA and nav link. Not negotiable. |
| `rounded-[2.5rem]` | Service **tier** cards on `/services` (8 occurrences = 4 tiers × 2 locales). |
| `rounded-2xl` | Form panels, toasts, and the mobile-menu item rows. |
| `0` (no class) | Everything else — tiles, blog cards, bands, images, inputs. |

### 1.2 Hero Pattern

Every public page hero follows one shape, top to bottom:

```astro
<section class="pt-16 pb-14 lg:pt-20 lg:pb-16 bg-slate-50 border-b border-slate-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <span class="block text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-primary">
      Section Label
    </span>
    <h1 class="mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-heading text-brand-dark font-semibold leading-[1.05] tracking-tight">
      Headline
    </h1>
    <p class="mt-8 max-w-2xl text-slate-600 text-base lg:text-lg leading-relaxed">
      Supporting sentence, two lines maximum at 832px.
    </p>
  </div>
</section>
```

* Left-aligned inside the 7xl container. No `text-center`, no gradient.
* `font-semibold` (600) — not bold, not extrabold.
* `max-w-4xl` on the h1 and `max-w-2xl` on the paragraph. An unbounded h1 runs to 1181px and looks wrong.
* Page-level hero comments are `pt-16 pb-14 lg:pt-20 lg:pb-16`; mid-page bands are `py-16 lg:py-20`.
* Long-form post heroes (`blog/[slug].astro`) are the exception: `min-h-[400px] md:min-h-[500px] flex items-center` with `py-16 md:py-20` inside, so a 4-line title grows the box instead of being clipped.

### 1.3 Eyebrow / Small-Caps Label

Two sizes exist. Use the existing component rather than copying the classes:

* `ui/SectionEyebrow.astro` — gold hairline rule + `text-[0.68rem] … tracking-[0.22em]`. Accepts `align="left|center"` and `tone="light|dark"`.
* **Tier labels** on `/services` use the tighter `text-[0.65rem] … tracking-[0.18em]` variant, `text-brand-primary` on light cards and `text-brand-accent` on the dark featured card.

On a light surface the rule carries the gold and the text stays forest green, because gold text on light fails contrast.

### 1.4 Tile (the core card pattern)

Used by homepage service tiles, blog article cards, and the à-la-carte rows. Flat, no border, no shadow, colour-only hover:

```html
<a class="group flex h-full flex-col bg-brand-light p-8 lg:p-9
          transition-colors duration-300 hover:bg-brand-primary">
  <h3 class="… text-brand-dark transition-colors duration-300 group-hover:text-white">Title</h3>
  <p class="… text-slate-600 transition-colors duration-300 group-hover:text-white/75">Body</p>
  <span class="… text-brand-primary transition-colors duration-300 group-hover:text-brand-accent">Read more →</span>
</a>
```

**The hover state is a contract.** If you add a child to a tile you must also give it a `group-hover:` colour, or it will disappear against the green fill:

| Child | Base | On `group-hover` |
| :--- | :--- | :--- |
| Title | `text-brand-dark` | `text-white` |
| Body | `text-slate-600` | `text-white/75` |
| Meta | `text-slate-600` | `text-white/60` |
| Accent link | `text-brand-primary` | `text-brand-accent` |
| Divider | `border-slate-200/70` | `border-white/20` |

When a tile is generated twice — once in Astro markup and once in a client script — **both copies must carry identical classes.** `blog.astro` builds the same card a second time for Firestore-hydrated posts; updating only the `.astro` markup leaves late-loading posts on the old design.

### 1.5 Dark Bands

`bg-brand-dark` with gold eyebrows (`text-brand-accent`), white headings, `text-slate-300` body, and `md:divide-white/20` hairlines. Used by About mission/vision, the blog advisory callout, and (legacy) the FAQ hero.

### 1.6 Section Rhythm, Dividers, Shadows

* Sections alternate `bg-white` / `bg-slate-50`, separated by `border-t border-slate-200`.
* Multi-column blocks use **hairline dividers** (`md:divide-x md:divide-slate-200`, plus `gap-y-12 md:gap-y-0` when they stack) instead of cards.
* Shadows are effectively banned. `shadow-none` is the default; the only surviving shadows are the two `drop-shadow-*` exceptions, the tier cards, and the `shadow-lg` on the mobile-menu overlay (a floating panel needs to detach from the page).
* Every section puts its content on the same gutter: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` → a 32px left edge at ≥1280px. A band using `max-w-5xl`/`max-w-4xl` breaks that alignment and must not be used for body sections.
  * **One sanctioned exception:** the `LegalDisclaimer` band is a centred `max-w-4xl` fine-print notice, so its text sits at ~199px rather than 32px. That is deliberate — legal small print reads as a footnote, not as body copy.

### 1.7 Long-Form Page Pattern (service guides)

A service guide is **four stacked full-bleed bands**, never one narrow column of boxes. Copy this skeleton verbatim for any new long-form page:

```
1. Hero      bg-brand-dark, py-16 lg:py-24, **7xl cap**, h1 font-semibold leading-[1.05]
             + back link text-slate-300, tier label text-brand-accent
2. Intro     bg-slate-50 border-b border-slate-200, py-16 lg:py-20,
             **NO width cap** — px-4 sm:px-6 lg:px-8 only
             → eyebrow + pull statement, max-w-none, text-2xl … 2xl:text-6xl
3. Body      bg-white, py-16 lg:py-20, 7xl — 12-col numbered rails (below)
4. CTA       bg-brand-dark text-white py-16 lg:py-20,
             **NO width cap** — `flex flex-col lg:flex-row lg:items-center gap-8`:
             optional partner logo, then heading + body (`flex-1`), then buttons (`shrink-0`, `lg:justify-end`)
```

**Bands 2 and 4 are deliberately uncapped.** Their backgrounds already bleed, so capping the inner wrapper was what made them read as "a box on a page" rather than a banner. Dropping the cap runs the statement from the 32px gutter to the opposite screen edge, and pins the closing CTA's buttons to that same edge. Measured on `/es/services/paquete-lanzamiento-completo`: statement 32px → 1393px at a 1425px viewport, 0 horizontal overflow at 390 / 768 / 1024 / 1440.

Do **not** extend the no-cap rule to band 1 or 3 — a full-width `<h1>` or full-width body measure is unreadable. The type scale is what makes the banner work, not the raw width.

**No letter monograms in the CTA band.** Placeholder boxes like `GN` / `CVA` were removed on 2026-11-05: they added ~90px of vertical height to the band (a 64px square plus its gap) for no information, which is what made the banner look thick. Do not reintroduce them.

The only logo permitted in a CTA band is **CreedaVA's**, and only on the two CreedaVA guides (`apoyo-creedava`, `creedava-support`) — those pages sell a partner service and must name the partner visually. Asset: `public/images/creedava-logo.svg` (vector, mark + wordmark, 724×602).

```html
<img src="/images/creedava-logo.svg" alt="CreedaVA" width="242" height="201" decoding="async"
     class="h-20 w-auto shrink-0 self-start lg:self-center bg-white p-2" />
```

Three details are load-bearing:

* **The white plate is mandatory.** Every colour in that logo is a dark teal (`#014e73`–`#499644`); against `bg-brand-dark` it measures ~2.3:1 and turns to mud. Never place it directly on the dark band.
* **`self-start lg:self-center`** — without it the column flex stretches the image to the full viewport width on mobile.
* **No `loading="lazy"`.** It sat below the fold and never resolved. Use `decoding="async"`.

Because the logo sits in the same row as the heading, it costs no height on desktop: the band measures 307px with the logo and 291–307px on the guides without one.

**The numbered rail is the body unit.** Repeat it per chapter:

```html
<div class="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-12
            border-t border-slate-200 pt-12 first:border-t-0 first:pt-0">
  <div class="lg:col-span-3">
    <h2 class="lg:sticky lg:top-28 text-[0.68rem] font-bold uppercase
               tracking-[0.22em] text-brand-primary">01 — Section title</h2>
  </div>
  <div class="lg:col-span-9 max-w-3xl space-y-5">…body…</div>
</div>
```

* Do **not** wrap the body in a bordered or filled box. The hairline `border-t` above each chapter is the only separation.
* Sub-lists are `border-t border-slate-200 pt-6 space-y-3`; sub-card grids are `grid … gap-x-10 gap-y-6 border-t border-slate-200 pt-6` with plain children (no per-item radius or border).
* At ≥1024px the rail is 3/12 with `lg:sticky lg:top-28`; it stacks cleanly below that. Measured: rail 264px, body 768px.
* The only dark panel inside the body is `bg-brand-dark text-white p-8 lg:p-10 space-y-5` — flat, no radius.
* Guide pages have **translated slugs**, so every one must pass `altPath` to both `<BaseLayout>` and `<Header>`:

```astro
<BaseLayout … altPath="/en/services/operations-growth">
  <Header slot="header" altPath="/en/services/operations-growth" />
```

Omitting it from `<Header>` makes the language toggle 404, because the default toggle only swaps `/es` ↔ `/en` and keeps the slug.

---

## 2. i18n Architecture & Translation Mechanics

The website uses a Lightweight Static i18n approach with dictionary files.

### Utility Functions ([src/i18n/utils.ts](file:///home/wicked/Projects/Guia%20Negocios/src/i18n/utils.ts))

* `getLangFromUrl(url: URL)`: Extracts language prefix (`en` or `es`) from the current request URL path. Defaults to `es` (the site's default locale).
* `useTranslations(lang: 'en' | 'es')`: Returns a helper function `t(key)` to look up translation values.

### Example Usage in `.astro` Component:

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t('nav.services')}</h1>
```

### Adding New Translation Keys
To introduce a new UI string:
1. Open [src/i18n/en.json](file:///home/wicked/Projects/Guia%20Negocios/src/i18n/en.json) and add the key under the appropriate section.
2. Open [src/i18n/es.json](file:///home/wicked/Projects/Guia%20Negocios/src/i18n/es.json) and add the corresponding Spanish translation.
