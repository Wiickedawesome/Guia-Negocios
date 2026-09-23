import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Must match the projectId in src/lib/firebase.ts. Pinned explicitly because
// Application Default Credentials otherwise resolve the project from the local
// gcloud config, which silently queries the WRONG (empty) database and returns
// zero documents with no error.
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT || 'guianegocios-prod';

let cachedAdminDb: any = null;
let initializationFailed = false;

/**
 * Resolve service account credentials from the environment.
 * Supports either raw JSON or base64-encoded JSON, so CI can pass the whole
 * key through a single secret without writing it to disk.
 */
function readServiceAccountFromEnv(): any | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw || !raw.trim()) return null;
  try {
    const text = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8');
    return JSON.parse(text);
  } catch (err: any) {
    console.warn('[admin-db] Could not parse service account from env:', err?.message || err);
    return null;
  }
}

/**
 * Firestore client for build/SSR contexts, using the Admin SDK so reads bypass
 * App Check (the client SDK cannot obtain an App Check token in Node, which made
 * every build-time read fail with "Missing or insufficient permissions").
 *
 * Credential sources, in order:
 *   1. FIREBASE_SERVICE_ACCOUNT_KEY / FIREBASE_SERVICE_ACCOUNT_JSON (raw or base64)
 *   2. GOOGLE_APPLICATION_CREDENTIALS file path
 *   3. serviceAccountKey.json in the project root (local development)
 *   4. Application Default Credentials (Cloud Functions, gcloud auth)
 *
 * Returns null instead of throwing when no usable credential exists, so callers
 * can fall back rather than crash the build.
 */
export function getAdminDb(): any {
  if (cachedAdminDb || initializationFailed) return cachedAdminDb;

  try {
    if (getApps().length === 0) {
      const inlineKey = readServiceAccountFromEnv();
      const credentialPath =
        process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(process.cwd(), 'serviceAccountKey.json');

      if (inlineKey) {
        initializeApp({ credential: cert(inlineKey), projectId: inlineKey.project_id || PROJECT_ID });
      } else if (fs.existsSync(credentialPath)) {
        const serviceAccount = JSON.parse(fs.readFileSync(credentialPath, 'utf8'));
        initializeApp({ credential: cert(serviceAccount), projectId: serviceAccount.project_id || PROJECT_ID });
      } else {
        // Last resort. Succeeds in GCP-hosted runtimes; the eventual read is
        // what fails if ADC is genuinely unavailable, and callers handle that.
        initializeApp({ credential: applicationDefault(), projectId: PROJECT_ID });
      }
    }

    cachedAdminDb = getFirestore();
    return cachedAdminDb;
  } catch (err: any) {
    initializationFailed = true;
    console.warn('[admin-db] Admin SDK unavailable:', err?.message || err);
    return null;
  }
}
