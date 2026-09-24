/**
 * Local verification of firestore.rules against the Firestore emulator.
 *
 * Status semantics:
 *   403/401 = PERMISSION_DENIED (rules rejected the request)
 *   404     = allowed by rules but the document does not exist
 *   200     = allowed and succeeded
 *
 * Every request uses a unique document ID so a PATCH is always a genuine
 * create - the emulator is stateful, and reusing IDs silently turns the
 * operation into an update (which is admin-only by design).
 *
 * Auth simulation: the emulator accepts an unsigned (alg: none) JWT via the
 * Authorization header, so admin-only paths are exercised for real.
 */
const fs = require('fs');
const path = require('path');

const PROJECT = 'guianegocios-prod';
const RULES_URL = `http://localhost:8080/emulator/v1/projects/${PROJECT}:securityRules`;
const DOCS_URL = `http://localhost:8080/v1/projects/${PROJECT}/databases/(default)/documents`;
const RUN_ID = Date.now().toString(36);

function makeToken(payload) {
  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  return `${b64({ alg: 'none', typ: 'JWT' })}.${b64(payload)}.`;
}

const ANON = {};
const ADMIN = { Authorization: `Bearer ${makeToken({ sub: 'u1', email: 'admin@guianegocios.net' })}` };
const OUTSIDER = { Authorization: `Bearer ${makeToken({ sub: 'u2', email: 'attacker@evil.test' })}` };
const UPPERCASE = { Authorization: `Bearer ${makeToken({ sub: 'u3', email: 'Admin@GuiaNegocios.NET' })}` };
const NO_EMAIL = { Authorization: `Bearer ${makeToken({ sub: 'u4' })}` };

async function pushRules(content) {
  const res = await fetch(RULES_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rules: { files: [{ name: 'firestore.rules', content }] } }),
  });
  const body = await res.text();
  let issues = [];
  try {
    issues = JSON.parse(body).issues || [];
  } catch { /* non-JSON */ }
  return { status: res.status, issues, body };
}

async function readDocs(pathname, headers) {
  const res = await fetch(`${DOCS_URL}/${pathname}`, { headers });
  return res.status;
}

async function writeDoc(pathname, headers, fields) {
  const res = await fetch(`${DOCS_URL}/${pathname}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify({ fields }),
  });
  return res.status;
}

const denied = (s) => s === 403 || s === 401;
const allowed = (s) => s === 200 || s === 404;

(async () => {
  const good = fs.readFileSync(path.join(process.cwd(), 'firestore.rules'), 'utf8');

  console.log('=== STEP 1: compile check (with negative control) ===');
  const bad = await pushRules(`${good}\nthis is deliberately invalid\n`);
  const controlDetects = bad.status >= 400 || bad.issues.length > 0;
  console.log(`   negative control: ${controlDetects ? 'PASS (invalid rules rejected)' : 'FAIL (validator blind)'}`);
  if (!controlDetects) process.exit(1);

  const pushed = await pushRules(good);
  const clean = pushed.status === 200 && pushed.issues.length === 0;
  console.log(`   actual rules: ${clean ? 'PASS (compiles, no issues)' : 'FAIL'}`);
  if (!clean) {
    console.log(JSON.stringify(pushed.issues, null, 1));
    process.exit(1);
  }

  const contact = (n) => ({
    name: { stringValue: 'A' },
    email: { stringValue: 'a@b.co' },
    message: { stringValue: 'hi' },
  });
  const mailTo = (to) => ({ to: { stringValue: to }, message: { mapValue: {} } });

  const checks = [];

  // ── Anonymous: intake size caps must reject oversized writes ──
  // These are the negative controls for the new validation: each one is the
  // same create that is allowed above, with a single field over its limit.
  checks.push([
    '[anon] oversized message (5001)',
    await writeDoc(`contacts/bigmsg${RUN_ID}`, ANON, {
      name: { stringValue: 'A' },
      email: { stringValue: 'a@b.co' },
      message: { stringValue: 'x'.repeat(5001) },
    }),
    'DENY',
  ]);
  checks.push([
    '[anon] oversized name (201)',
    await writeDoc(`contacts/bigname${RUN_ID}`, ANON, {
      name: { stringValue: 'x'.repeat(201) },
      email: { stringValue: 'a@b.co' },
      message: { stringValue: 'hi' },
    }),
    'DENY',
  ]);
  checks.push([
    '[anon] non-string message (type bypass)',
    await writeDoc(`contacts/badtype${RUN_ID}`, ANON, {
      name: { stringValue: 'A' },
      email: { stringValue: 'a@b.co' },
      message: { integerValue: '1' },
    }),
    'DENY',
  ]);
  checks.push([
    '[anon] oversized notification title (201)',
    await writeDoc(`notifications/big${RUN_ID}`, ANON, {
      title: { stringValue: 'x'.repeat(201) },
      message: { stringValue: 'M' },
    }),
    'DENY',
  ]);
  checks.push([
    '[anon] oversized notification message (601)',
    await writeDoc(`notifications/bigmsg${RUN_ID}`, ANON, {
      title: { stringValue: 'T' },
      message: { stringValue: 'x'.repeat(601) },
    }),
    'DENY',
  ]);
  checks.push([
    '[anon] mail without message map',
    await writeDoc(`mail/nomsg${RUN_ID}`, ANON, {
      to: { stringValue: 'info@guianegocios.net' },
    }),
    'DENY',
  ]);

  // ── Anonymous: public reads and form intake must work ──
  checks.push(['[anon] read blogs', await readDocs(`blogs/r${RUN_ID}`, ANON), 'ALLOW']);
  checks.push(['[anon] read landingPages', await readDocs(`landingPages/r${RUN_ID}`, ANON), 'ALLOW']);
  checks.push(['[anon] read seoSchemas', await readDocs(`seoSchemas/r${RUN_ID}`, ANON), 'ALLOW']);
  checks.push(['[anon] create contact', await writeDoc(`contacts/c${RUN_ID}`, ANON, contact()), 'ALLOW']);
  checks.push([
    '[anon] create notification',
    await writeDoc(`notifications/n${RUN_ID}`, ANON, {
      title: { stringValue: 'T' },
      message: { stringValue: 'M' },
    }),
    'ALLOW',
  ]);
  checks.push(['[anon] email business inbox', await writeDoc(`mail/m1${RUN_ID}`, ANON, mailTo('info@guianegocios.net')), 'ALLOW']);

  // ── Anonymous: everything else must be blocked ──
  checks.push(['[anon] write blogs', await writeDoc(`blogs/w${RUN_ID}`, ANON, { status: { stringValue: 'Published' } }), 'DENY']);
  checks.push(['[anon] write landingPages', await writeDoc(`landingPages/w${RUN_ID}`, ANON, { slug: { stringValue: 'x' } }), 'DENY']);
  checks.push(['[anon] write seoSchemas', await writeDoc(`seoSchemas/w${RUN_ID}`, ANON, { status: { stringValue: 'Active' } }), 'DENY']);
  checks.push(['[anon] read settings (Gemini key)', await readDocs('settings/admin', ANON), 'DENY']);
  checks.push(['[anon] write settings', await writeDoc(`settings/w${RUN_ID}`, ANON, { geminiKey: { stringValue: 'x' } }), 'DENY']);
  checks.push(['[anon] read contacts (lead PII)', await readDocs(`contacts/c${RUN_ID}`, ANON), 'DENY']);
  checks.push(['[anon] update existing contact', await writeDoc(`contacts/c${RUN_ID}`, ANON, { name: { stringValue: 'B' } }), 'DENY']);
  checks.push(['[anon] read notifications', await readDocs(`notifications/n${RUN_ID}`, ANON), 'DENY']);
  checks.push(['[anon] read mail queue', await readDocs(`mail/m1${RUN_ID}`, ANON), 'DENY']);
  checks.push(['[anon] read keywords', await readDocs(`keywords/r${RUN_ID}`, ANON), 'DENY']);
  checks.push(['[anon] read agent-runs', await readDocs(`agent-runs/r${RUN_ID}`, ANON), 'DENY']);
  checks.push(['[anon] read backlinks', await readDocs(`backlinks/r${RUN_ID}`, ANON), 'DENY']);
  checks.push(['[anon] read reports', await readDocs(`reports/r${RUN_ID}`, ANON), 'DENY']);
  checks.push(['[anon] read usedImages', await readDocs(`usedImages/r${RUN_ID}`, ANON), 'DENY']);
  checks.push(['[anon] email arbitrary recipient', await writeDoc(`mail/b1${RUN_ID}`, ANON, mailTo('attacker@evil.test')), 'DENY']);

  // ── Authenticated admin: full access ──
  checks.push(['[admin] read settings', await readDocs('settings/admin', ADMIN), 'ALLOW']);
  checks.push(['[admin] read contacts', await readDocs(`contacts/c${RUN_ID}`, ADMIN), 'ALLOW']);
  checks.push(['[admin] write blogs', await writeDoc(`blogs/a${RUN_ID}`, ADMIN, { status: { stringValue: 'Published' } }), 'ALLOW']);
  checks.push(['[admin] write landingPages', await writeDoc(`landingPages/a${RUN_ID}`, ADMIN, { slug: { stringValue: 'x' } }), 'ALLOW']);
  checks.push(['[admin] write seoSchemas', await writeDoc(`seoSchemas/a${RUN_ID}`, ADMIN, { status: { stringValue: 'Active' } }), 'ALLOW']);
  checks.push(['[admin] read keywords', await readDocs(`keywords/r${RUN_ID}`, ADMIN), 'ALLOW']);
  checks.push(['[admin] email any recipient', await writeDoc(`mail/a${RUN_ID}`, ADMIN, mailTo('client@example.com')), 'ALLOW']);
  checks.push(['[admin] uppercase email domain', await readDocs('settings/admin', UPPERCASE), 'ALLOW']);

  // ── Authenticated non-admin / malformed claims ──
  checks.push(['[outsider] read settings', await readDocs('settings/admin', OUTSIDER), 'DENY']);
  checks.push(['[outsider] write blogs', await writeDoc(`blogs/o${RUN_ID}`, OUTSIDER, { status: { stringValue: 'x' } }), 'DENY']);
  checks.push(['[outsider] read contacts', await readDocs(`contacts/c${RUN_ID}`, OUTSIDER), 'DENY']);
  checks.push(['[no email claim] read settings', await readDocs('settings/admin', NO_EMAIL), 'DENY']);

  console.log('\n=== STEP 2-4: access model ===');
  let failures = 0;
  for (const [label, status, expected] of checks) {
    const pass = expected === 'ALLOW' ? allowed(status) : denied(status);
    if (!pass) {
      console.log(`   FAIL  ${label} -> HTTP ${status} (expected ${expected})`);
      failures++;
    }
  }

  console.log(
    `\n=== RESULT: ${failures === 0 ? `ALL ${checks.length} CHECKS PASSED` : `${failures} of ${checks.length} FAILED`} ===`
  );
  process.exit(0);
})().catch((e) => {
  console.error('SCRIPT ERROR:', e.message);
  process.exit(1);
});
