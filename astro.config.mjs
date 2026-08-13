// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],
  redirects: {
    '/admin': '/admin/login',
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es'],
    routing: 'manual',
  },
});