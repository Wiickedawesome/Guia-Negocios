/**
 * One-off cleanup of pre-fix `keywords` rows (2026-10-18).
 *
 * Context: the Aug 13–17 rows stored invented positions AND volumes — five
 * sampled rows had zero matching GSC queries at all (positions clustered on
 * "4", volumes like 353/504 impossibly large for a property with ~70
 * impressions in 90 days). The Aug 31 rows' positions match live Search
 * Console (stored 78 vs GSC 78.3) but their volumes do not (stored 140 vs 3
 * real impressions), so only the volume is cleared there.
 *
 * Rows created on/after 2026-09-29 were saved by the fixed code and are
 * already clean — this script never touches them.
 *
 * Originals are preserved on each row under `unverifiedMetrics`, and the
 * full collection is backed up before any write.
 *
 * Usage:
 *   node scripts/cleanup-keyword-metrics.mjs           # dry run (default)
 *   node scripts/cleanup-keyword-metrics.mjs --apply   # backup + write
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const PROJECT_ID = 'guianegocios-prod';
const APPLY = process.argv.includes('--apply');
const FULL_CLEAR_BEFORE = new Date('2026-08-18T00:00:00Z'); // Aug 13–17 batch: positions + volumes fabricated
const VOLUME_CLEAR_FROM = new Date('2026-08-31T00:00:00Z'); // Aug 31 batch: positions match GSC, volumes do not
const VOLUME_CLEAR_TO = new Date('2026-09-01T00:00:00Z');

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(scriptDir, '..', 'serviceAccountKey.json'), 'utf8')
);

const app = initializeApp({ credential: cert(serviceAccount), projectId: PROJECT_ID });
const db = getFirestore(app);

function toDate(value) {
  return value?.toDate ? value.toDate() : null;
}

(async () => {
  const snapshot = await db.collection('keywords').get();

  const plan = [];
  const skipped = { clean: 0, alreadyCleared: 0, noCreatedAt: 0 };

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.source === 'legacy') { skipped.alreadyCleared++; return; }
    const createdAt = toDate(data.createdAt);
    if (!createdAt) { skipped.noCreatedAt++; return; }

    if (createdAt < FULL_CLEAR_BEFORE) {
      if (typeof data.position !== 'number' && typeof data.volume !== 'number') { skipped.clean++; return; }
      plan.push({
        id: doc.id,
        keyword: data.keyword,
        action: 'clear position + volume',
        update: {
          position: null,
          volume: null,
          source: 'legacy',
          metricsClearedAt: new Date(),
          unverifiedMetrics: { position: data.position ?? null, volume: data.volume ?? null },
        },
      });
    } else if (createdAt >= VOLUME_CLEAR_FROM && createdAt < VOLUME_CLEAR_TO) {
      if (typeof data.volume !== 'number') { skipped.clean++; return; }
      plan.push({
        id: doc.id,
        keyword: data.keyword,
        action: 'clear volume (position verified real)',
        update: {
          volume: null,
          source: 'legacy',
          metricsClearedAt: new Date(),
          unverifiedMetrics: { volume: data.volume },
        },
      });
    } else {
      skipped.clean++;
    }
  });

  console.log(`Project: ${PROJECT_ID}`);
  console.log(`Docs total: ${snapshot.size}`);
  console.log(
    `Planned changes: ${plan.length}  (already cleared: ${skipped.alreadyCleared}, ` +
    `clean/skipped: ${skipped.clean}, missing createdAt: ${skipped.noCreatedAt})\n`
  );
  for (const item of plan) {
    console.log(`  ${item.action.padEnd(34)} ${item.id}  "${item.keyword}"`);
  }

  if (!APPLY) {
    console.log('\nDry run — nothing written. Re-run with --apply to execute.');
    return;
  }

  const backupDir = path.join(os.homedir(), 'guianegocios-backups');
  fs.mkdirSync(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, `keywords-pre-cleanup-${new Date().toISOString().slice(0, 10)}.json`);
  fs.writeFileSync(backupPath, JSON.stringify({
    exportedAt: new Date().toISOString(),
    projectId: PROJECT_ID,
    docs: snapshot.docs.map(d => ({ id: d.id, data: d.data() })),
  }, null, 2));
  console.log(`\nBackup written: ${backupPath}`);

  let batch = db.batch();
  let batched = 0;
  for (const item of plan) {
    batch.set(db.collection('keywords').doc(item.id), item.update, { merge: true });
    if (++batched === 450) {
      await batch.commit();
      batch = db.batch();
      batched = 0;
    }
  }
  if (batched > 0) await batch.commit();

  console.log(`Applied ${plan.length} update(s).`);
})().catch(err => {
  console.error('Cleanup failed:', err);
  process.exit(1);
});
