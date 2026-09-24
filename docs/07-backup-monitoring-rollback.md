# 07 — Backup, Monitoring and Rollback

Status of the three "what if it breaks / what if we lose data" controls.
Last reviewed: 2026-09-24.

## Summary

| Control | Status | Owned by |
| --- | --- | --- |
| Post-deploy smoke test | **In place** — runs on every deploy (36 checks) | repo / CI |
| Rules-drift check | **In place** — `scripts/check-deployed-rules.cjs` | repo |
| Hosting rollback | Documented below (one command) | repo / Firebase CLI |
| Firestore automated backups | **ENABLED** — daily, 7-day retention | gcloud |
| Uptime check | **ENABLED** — every 5 min, HTTPS + content match | gcloud |
| Email alert channel | **CREATED — needs one click to verify** (see 3.3) | gcloud + inbox |
| Alert policy on uptime failure | **ENABLED** | gcloud |
| Firestore point-in-time recovery | **NOT ENABLED** — console only | needs console access |
| Billing budget alert | **NOT ENABLED** — needs billing admin | needs billing access |

## 0. Live resource IDs (verified 2026-09-24)

```
backup schedule   projects/guianegocios-prod/databases/(default)/backupSchedules/e846dc38-b414-4baa-9820-72c537822cfa
                      daily recurrence, retention 604800s (7d)
uptime check      projects/guianegocios-prod/uptimeCheckConfigs/guianegocios-net-home-MdXWvDEm_r8
                      https://guianegocios.net/ every 300s, expects 200 + body contains "GUIA NEGOCIOS"
email channel     projects/guianegocios-prod/notificationChannels/4662172721375116843
                      info@guianegocios.net
alert policy      projects/guianegocios-prod/alertPolicies/1710147716258357131
                      fires after 2+ failing checks across 300s
```

The alert policy is stored in the repo at `monitoring/uptime-alert-policy.json`, so
it can be recreated or edited as code:

```bash
gcloud alpha monitoring policies create \
  --policy-from-file=monitoring/uptime-alert-policy.json --project=guianegocios-prod
```

### Auth note — read before running any gcloud command here

The workstation's default gcloud config is shared with another project, so:

- `gcloud config get-value project` returns `evrconstruction-5f7bd`, and the
  service-account entry for that project has **no access to `guianegocios-prod`**.
  Every command in this document therefore passes `--project=guianegocios-prod`
  explicitly, which is what makes them work.
- To make this the default project (only if the other project is not in use):

  ```bash
  gcloud config set project guianegocios-prod
  ```

## 1. What is already monitored

### `scripts/smoke-test-production.mjs`
Runs as a step in `.github/workflows/firebase-hosting-merge.yml` immediately after
the live deploy, and fails the workflow on regression. Every check exists because
that exact breakage was found in production at least once:

- branded 404 that returns a real 404 (was a self-refreshing stub loop)
- `/es/404/` returns 404
- unknown blog and landing-page slugs return 404 (were thin HTTP 200s)
- multi-segment wildcard paths return 404 rather than redirecting to themselves
  (was an endless 302 loop)
- every URL in `sitemap-0.xml` returns 200
- `contenteditable` never reaches a live landing page
- no `<lastmod>` build-time stamps in the sitemap
- the consent gate is present and the Meta Pixel is not requested before consent
- admin pages load no analytics

Run it locally against production or a preview build:

```bash
node scripts/smoke-test-production.mjs
SMOKE_BASE_URL=http://localhost:4322 node scripts/smoke-test-production.mjs
```

### `scripts/check-deployed-rules.cjs`
Compares the deployed Firestore ruleset against the local `firestore.rules`
byte-for-byte. Run it after any rules deploy.

### `scripts/verify-firestore-rules.cjs`
Functional rules test against the local emulator (39 checks, including negative
controls that assert oversized and wrong-typed payloads are denied). Run before
deploying rules.

## 2. Rollback

### Hosting (static site) — fastest
Firebase keeps previous releases, so the site can be rolled back without a build:

```bash
firebase hosting:rollback --project guianegocios-prod
```

It lists recent releases and re-promotes the one you pick. This rolls back
`dist/` **and** the `firebase.json` config that was deployed with it, so a bad
rewrite/redirect change is reverted too.

The git equivalent, if you would rather deploy a known commit:

```bash
git revert --no-edit <bad-commit>
git push origin main        # CI rebuilds and deploys
```

### Cloud Functions
Functions are not versioned by release channel, so rollback means redeploying the
last known-good commit:

```bash
git log --oneline -- functions/src        # find the last good commit
git revert --no-edit <bad-commit> && git push origin main
firebase deploy --only functions --project guianegocios-prod
```

### Firestore rules
Rules are versioned by the Rules API. To roll back, restore the previous file and
deploy, then confirm with the drift checker:

```bash
git log --oneline -- firestore.rules
git checkout <good-commit> -- firestore.rules
firebase deploy --only firestore:rules --project guianegocios-prod
node scripts/check-deployed-rules.cjs
```

### Firestore data
Restore from the most recent backup (see 3.1). Note that a restore **overwrites
the database** — it is a last resort, not a selective undo.

## 3. Backup and monitoring (configured 2026-09-24)

An earlier attempt at these failed because the gcloud CLI was pointed at a
different project's credentials entirely. `info@guianegocios.net` has access;
what is missing now is only point-in-time recovery and the billing budget
alert, both of which are console/billing-account actions rather than CLI ones.

### 3.1 Firestore automated backups — ENABLED
Daily snapshot, 7-day retention. Created with:

```bash
gcloud firestore backups schedules create \
  --database='(default)' \
  --recurrence=daily \
  --retention=7d \
  --project=guianegocios-prod
```

List schedules and the backups they produce:

```bash
gcloud firestore backups schedules list --database='(default)' --project=guianegocios-prod
gcloud firestore backups list --location=nam5 --project=guianegocios-prod
```

The database is in `nam5`, so backups live there too (not `us-central1`).

Restore:

```bash
gcloud firestore databases restore \
  --source-backup=projects/guianegocios-prod/locations/nam5/backups/<backup-id> \
  --destination-database='(default)' \
  --project=guianegocios-prod
```

A restore **overwrites the database**. The content that matters most here
(blogs, landingPages, seoSchemas) is regenerable from the repo and `scripts/`,
but `contacts`, `mail` and `notifications` — real customer leads — are not,
which is the whole reason this backup exists.

### 3.2 Point-in-time recovery — NOT ENABLED
Recovers to any minute within the last 7 days, which protects against a bad bulk
delete rather than just disk failure. This one is console-only:
**Firestore → Backups → Point-in-time recovery**. It cannot be enabled from the
CLI. Small extra storage cost; this database is a few MB.

### 3.3 Uptime check and alerting — ENABLED (one click outstanding)

The uptime check requests `https://guianegocios.net/` every 5 minutes and
requires both a `200` **and** the body to contain `GUIA NEGOCIOS`. The content
match matters: a deploy that serves an empty or error page with a 200 status
would otherwise pass unnoticed.

The email channel still needs its verification click — Google sent a
confirmation email to `info@guianegocios.net`, and alerts will not be delivered
until that link is clicked. Check the inbox for "Google Cloud Monitoring".

### 3.4 Billing budget alert — NOT ENABLED
Needs `roles/billing.admin` on billing account `01F9BA-A59866-0F6B15`. Set a
budget with alerts at 50/90/100%. This matters more than usual here: the billing
account has been closed once before, and when it closes **deploys fail** with
`403 ... check billing account` while the live site keeps serving.

## 4. Known gaps

- **Point-in-time recovery** is off, so a bad bulk write between backups (up to
  24h of data) is unrecoverable.
- **The alert email is unverified** until someone clicks the link in Google's
  confirmation email.
- **No off-site backup of the Functions config or Firestore rules** — both are in
  git, which is adequate.
- **No alert on function errors.** Cloud Functions errors are visible in the
  console but nothing notifies anyone.
- **No alert on a failing CI deploy**, but the smoke test fails the workflow,
  which GitHub notifies on.
- **Analytics collection is consent-gated** (see BaseLayout), so GA4 figures
  under-count visitors who never answer the banner. That is intentional, but
  reports must not be read as total traffic.
