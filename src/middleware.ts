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

  // Astro's error page must render as-is. Without this the non-prefixed
  // fallback below rewrites /404 -> /es/404 while the page is being built, so
  // Astro emits a redirect stub as dist/404.html instead of the real page and
  // every 404 on the site loops on that stub forever.
  if (pathname === '/404' || pathname === '/404/') {
    return next();
  }

  // Fallback redirect for non-prefixed routes (e.g. /services -> /es/services)
  if (!pathname.startsWith('/es') && !pathname.startsWith('/en')) {
    return context.redirect(`/es${pathname}`, 302);
  }

  return next();
});
