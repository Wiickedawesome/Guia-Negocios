import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Ignore static assets, admin routes, API endpoints, or files with extensions
  if (
    pathname.startsWith('/_') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return next();
  }

  // Root URL -> handled directly by src/pages/index.astro (Spanish Home)
  if (pathname === '/' || pathname === '') {
    return next();
  }

  // Redirect /es or /es/ to /
  if (pathname === '/es' || pathname === '/es/') {
    return context.redirect('/', 301);
  }

  // Fallback redirect for non-prefixed routes (e.g. /services -> /es/services)
  if (!pathname.startsWith('/es') && !pathname.startsWith('/en')) {
    return context.redirect(`/es${pathname}`, 302);
  }

  return next();
});
