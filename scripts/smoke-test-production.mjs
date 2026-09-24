/**
 * Post-deploy production smoke test.
 *
 * Every check here exists because the corresponding breakage was found live at
 * least once. Running this after each deploy turns "we hope it still works" into
 * a pass/fail gate:
 *
 *   - a branded 404 that actually returns 404 (was a self-refreshing stub loop)
 *   - blog/landing-page wildcards that 404 on unknown slugs (were thin HTTP 200s)
 *   - no self-redirect loops on multi-segment paths (was an endless 302)
 *   - no editor attributes or build-time `lastmod` leaking into output
 *   - no analytics on admin pages, consent gate present on public pages
 *
 * Usage:  node scripts/smoke-test-production.mjs
 *         SMOKE_BASE_URL=http://localhost:4322 node scripts/smoke-test-production.mjs
 *
 * Exits non-zero if any check fails, so it can gate CI.
 */

const BASE = (process.env.SMOKE_BASE_URL || 'https://guianegocios.net').replace(/\/$/, '');

let passed = 0;
const failures = [];

function record(name, ok, detail = '') {
  if (ok) {
    passed++;
    console.log(`  ok    ${name}`);
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

async function request(path) {
  // manual redirects so a 301 is observable instead of being followed
  const res = await fetch(`${BASE}${path}`, {
    redirect: 'manual',
    headers: { 'cache-control': 'no-cache' },
  });
  return {
    status: res.status,
    location: res.headers.get('location') || '',
    body: await res.text(),
  };
}

function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  console.log(`Smoke testing ${BASE}\n`);

  // ── Key pages respond ───────────────────────────────────────────────
  console.log('Key pages:');
  for (const path of ['/', '/en/', '/es/about/', '/en/about/', '/es/contact/', '/en/contact/', '/es/services/', '/es/blog/', '/en/blog/', '/es/faq/']) {
    const { status } = await request(path);
    record(`${path} responds 200`, status === 200, `got ${status}`);
  }

  // ── Machine-readable files ──────────────────────────────────────────
  console.log('\nMachine-readable files:');
  for (const path of ['/robots.txt', '/llms.txt', '/sitemap-index.xml', '/favicon.ico', '/favicon.png']) {
    const { status } = await request(path);
    record(`${path} responds 200`, status === 200, `got ${status}`);
  }

  // ── 404 handling (regression: the handler used to redirect to itself) ──
  console.log('\n404 handling:');
  const bogus = await request('/this-page-does-not-exist-12345/');
  record('unknown path returns 404', bogus.status === 404, `got ${bogus.status}`);
  record('404 page is branded, not a redirect stub', bogus.body.length > 5000, `${bogus.body.length} bytes`);
  record('404 page is noindex', /name="robots"[^>]*noindex/i.test(bogus.body));
  record('404 page has no meta refresh', !/http-equiv=["']?refresh/i.test(bogus.body));

  const slash404 = await request('/es/404/');
  record('/es/404/ returns 404', slash404.status === 404, `got ${slash404.status}`);

  // ── Wildcard slug validation ────────────────────────────────────────
  console.log('\nWildcard slug validation:');
  const unknownBlog = await request('/es/blog/definitely-not-a-real-post/');
  record('unknown blog slug returns 404', unknownBlog.status === 404, `got ${unknownBlog.status}`);

  const deepBlog = await request('/es/blog/a/b/');
  record('multi-segment blog path returns 404, not a redirect', deepBlog.status === 404, `got ${deepBlog.status}${deepBlog.location ? ` -> ${deepBlog.location}` : ''}`);

  const unknownLp = await request('/es/lp/definitely-not-a-real-page/');
  record('unknown landing page slug returns 404', unknownLp.status === 404, `got ${unknownLp.status}`);

  const unknownLpEn = await request('/en/lp/definitely-not-a-real-page/');
  record('unknown EN landing page slug returns 404', unknownLpEn.status === 404, `got ${unknownLpEn.status}`);

  // A real page must still work, so this cannot pass by breaking everything.
  const realLp = await request('/es/lp/llamanos-asesoria-negocios/');
  record('live landing page still responds 200', realLp.status === 200, `got ${realLp.status}`);
  record('live landing page has no editor attributes', !/contenteditable/i.test(realLp.body));

  // ── Sitemap integrity ───────────────────────────────────────────────
  console.log('\nSitemap integrity:');
  const sitemap = await request('/sitemap-0.xml');
  const urls = sitemapUrls(sitemap.body);
  record('sitemap lists URLs', urls.length > 0, `${urls.length} URLs`);
  record('sitemap has no build-time lastmod', !/<lastmod>/i.test(sitemap.body));

  const broken = [];
  for (const url of urls) {
    const path = url.replace(/^https?:\/\/[^/]+/, '') || '/';
    const { status } = await request(path);
    if (status !== 200) broken.push(`${path} (${status})`);
  }
  record(`all ${urls.length} sitemap URLs return 200`, broken.length === 0, broken.slice(0, 6).join(', '));

  // ── Analytics / consent ─────────────────────────────────────────────
  console.log('\nAnalytics and consent:');
  const home = await request('/');
  record('consent defaults to denied', /consent['"],\s*['"]default['"]/.test(home.body));
  record('consent banner is present', home.body.includes('id="consent-banner"'));
  record('GA4 tag is present', home.body.includes('googletagmanager.com/gtag/js'));
  record('Meta Pixel is not requested before consent', !/<script[^>]+connect\.facebook\.net/.test(home.body));
  record('Meta Pixel noscript beacon is gone', !home.body.includes('facebook.com/tr?id='));

  const admin = await request('/admin/dashboard/');
  record('admin pages load no analytics', !admin.body.includes('googletagmanager.com/gtag/js'));
  record('admin pages load no consent banner', !admin.body.includes('id="consent-banner"'));

  // ── Result ──────────────────────────────────────────────────────────
  console.log(`\n${passed} passed, ${failures.length} failed`);
  if (failures.length > 0) {
    console.log('\nFailures:');
    failures.forEach((f) => console.log(`  - ${f}`));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`Smoke test could not run: ${err?.message || err}`);
  process.exit(1);
});
