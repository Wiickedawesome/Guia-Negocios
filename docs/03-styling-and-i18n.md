# Design Tokens, Styling & Internationalization — Guia Negocios

## 1. Design System & Tokens

Guia Negocios uses a custom Tailwind CSS v4 design system configured in [src/styles/global.css](file:///home/wicked/Projects/Guia%20Negocios/src/styles/global.css).

### Color Palette

| Token | Hex Value | Class Name | Recommended Usage |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `#1B4E2B` | `bg-brand-primary`, `text-brand-primary` | Primary action buttons, active links, badges |
| **Brand Accent** | `#F0C850` | `bg-brand-accent`, `text-brand-accent` | Gold accents, badge pills, highlights |
| **Brand Dark** | `#1A2E35` | `bg-brand-dark`, `text-brand-dark` | Hero section backgrounds, dark surfaces |
| **Brand Gray** | `#1E2A2F` | `bg-brand-gray`, `text-brand-gray` | Subtitles, borders, body text muted states |
| **Accent Emerald**| `#10B981` | `bg-emerald-600` | Success toasts, status tags |
| **Accent Amber**  | `#F59E0B` | `bg-amber-500` | Warning badges, pending statuses |

### Glassmorphism Guidelines
For cards over dark backgrounds, apply the following utility combination:
```html
<div class="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white shadow-xl">
  <!-- Card Content -->
</div>
```

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
