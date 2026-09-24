# 07 — Backup, Monitoring and Rollback

Status of the three "what if it breaks / what if we lose data" controls.
Last reviewed: 2026-09-24.

## Summary

| Control | Status | Owned by |
| --- | --- | --- |
| Post-deploy smoke test | **In place** — runs on every deploy | repo / CI |
| Rules-drift check | **In place** — `scripts/check-deployed-rules.cjs` | repo |
| Hosting rollback | Documented below (one command) | repo / Firebase CLI |
| Firestore automated backups | **NOT ENABLED** — blocked on IAM | needs a project Owner |
| Firestore point-in-time recovery | **NOT ENABLED** — blocked on IAM | needs a project Owner |
| Uptime check / alerting | **NOT ENABLED** — blocked on IAM | needs a project Owner |
| Billing budget alert | **NOT ENABLED** — needs billing access | needs billing admin |

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
**There is currently no automated backup, so this rollback is not possible.**
See the blocked items below.

## 3. NOT ENABLED — requires project-owner IAM

Both items below were attempted on 2026-09-24 and refused. The gcloud CLI on the
workstation is authenticated as an account with **no access to this project**:

```
ERROR: (gcloud.projects.describe) [contact@evrconstructions.com] does not have
permission to access projects instance [guianegocios-prod]

ERROR: (gcloud.firestore.backups.schedules.list) PERMISSION_DENIED

ERROR: (gcloud.monitoring.uptime.list-configs) Permission
'monitoring.uptimeCheckConfigs.list' denied
```

Using the repo's `serviceAccountKey.json`
(`firebase-adminsdk-fbsvc@guianegocios-prod.iam.gserviceaccount.com`) in an
isolated gcloud config fails the same way — that Firebase Admin SDK role covers
Firestore/Functions/Hosting but **not** Monitoring or backup administration.

To do these, either run them as a project Owner, or grant the caller
`roles/monitoring.admin` and `roles/datastore.backupAdmin`.

### 3.1 Firestore automated backups
Firestore managed backups take a daily snapshot with a configurable retention
window (7 days is plenty here). Console: **Firestore → Backups → Create schedule**.

```bash
gcloud firestore backups schedules create \
  --database='(default)' \
  --recurrence=daily \
  --retention=7d \
  --project=guianegocios-prod
```

Verify:

```bash
gcloud firestore backups schedules list --database='(default)' --project=guianegocios-prod
```

Restore is per-backup:

```bash
gcloud firestore backups list --location=us-central1 --project=guianegocios-prod
gcloud firestore databases restore \
  --source-backup=projects/guianegocios-prod/locations/us-central1/backups/<id> \
  --destination-database='(default)' \
  --project=guianegocios-prod
```

Worth knowing before enabling: a restore **overwrites the database**. The
content that matters most here (blogs, landingPages, seoSchemas) is also
regenerable from the repo and from `scripts/`, but `contacts`, `mail` and
`notifications` — real customer leads — are not.

### 3.2 Point-in-time recovery
Recovers to any minute within the last 7 days (protects against a bad bulk
delete, not just disk failure). Console: **Firestore → Backups → Point-in-time
recovery**. Both PITR and backups are billed on stored bytes; this database is
small, so the cost is negligible against the lead data it protects.

### 3.3 Uptime check and alerting
Console: **Monitoring → Uptime checks → Create**. An HTTPS check against
`https://guianegocios.net/` every 5 minutes, expecting a 200 and optionally a
body match, covers the whole hosting surface — if Hosting, DNS, or the SSL cert
breaks, you find out from an alert instead of from a customer.

Suggested alerting policy: notify `info@guianegocios.net` when a check fails for
more than one region for 5 minutes.

```bash
gcloud monitoring uptime create guianegocios-net \
  --resource-type=uptime-url \
  --resource-labels=host=guianegocios.net,project_id=guianegocios-prod \
  --protocol=https \
  --path=/ \
  --period=5 \
  --project=guianegocios-prod
```

### 3.4 Billing budget alert
Needs `roles/billing.admin` on the billing account that funds
`guianegocios-prod`. Set a budget with alerts at 50/90/100% — this project's
billing account has been closed once already, and when it closes, **deploys fail**
with `403 ... check billing account` while the live site keeps serving.

## 4. Known gaps

- **No Firestore backup**, so a bad write or an accidental delete is unrecoverable.
  This is the single highest-impact gap on this page; `contacts` and `mail` hold
  real customer leads.
- **No off-site backup of the Functions config or Firestore rules** — both are in
  git, which is adequate.
- **No alert on function errors.** Cloud Functions errors are visible in the
  console but nothing notifies anyone.
- **Analytics collection is consent-gated** (see BaseLayout), so GA4 figures
  under-count visitors who never answer the banner. That is intentional, but
  reports must not be read as total traffic.
