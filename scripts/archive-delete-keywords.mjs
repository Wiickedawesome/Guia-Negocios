/**
 * One-off: archive and delete the orphaned `keywords` collection.
 *
 * The admin keywords page became a live Search Console mirror on 2026-10-18
 * and no longer reads or writes this collection. The live GSC footprint is
 * ~50 queries against 56 stored rows of which 50 had never once been reported
 * by Google, so the stored list is superseded, not merely unused.
 *
 * Full backup is written to ~/guianegocios-backups/ before anything is
 * deleted. Usage: node scripts/archive-delete-keywords.mjs --apply
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const PROJECT_ID = 'guianegocios-prod';
const APPLY = process.argv.includes('--apply');

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(scriptDir, '..', 'serviceAccountKey.json'), 'utf8')
);

const app = initializeApp({ credential: cert(serviceAccount), projectId: PROJECT_ID });
const db = getFirestore(app);

(async () => {
  const snapshot = await db.collection('keywords').get();
  const docs = snapshot.docs.map(d => ({ id: d.id, data: d.data() }));
  console.log(`keywords collection: ${snapshot.size} docs`);

  if (snapshot.size === 0) {
    console.log('Nothing to do.');
    return;
  }

  const backupDir = path.join(os.homedir(), 'guianegocios-backups');
  fs.mkdirSync(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, `keywords-collection-final-${new Date().toISOString().slice(0, 10)}.json`);
  fs.writeFileSync(backupPath, JSON.stringify({ exportedAt: new Date().toISOString(), projectId: PROJECT_ID, docs }, null, 2));
  console.log(`Backup written: ${backupPath}`);

  if (!APPLY) {
    console.log('Dry run — nothing deleted. Re-run with --apply to delete.');
    return;
  }

  let batch = db.batch();
  let batched = 0;
  for (const doc of snapshot.docs) {
    batch.delete(doc.ref);
    if (++batched === 450) {
      await batch.commit();
      batch = db.batch();
      batched = 0;
    }
  }
  if (batched > 0) await batch.commit();

  const after = await db.collection('keywords').count().get();
  console.log(`Deleted. keywords collection now holds ${after.data().count} docs.`);
})().catch(err => {
  console.error('Cleanup failed:', err);
  process.exit(1);
});
