import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { readFileSync } from 'fs';

const envFile = readFileSync('.env', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) envVars[key.trim()] = value.join('=').trim();
});

const firebaseConfig = {
  apiKey: envVars.PUBLIC_FIREBASE_API_KEY,
  authDomain: envVars.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: envVars.PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function main() {
  const snapshot = await getDocs(collection(db, 'blogs'));
  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`\n--- POST: ${data.slugEn} / ${data.slugEs} ---`);
    console.log(`Title EN: ${data.titleEn}`);
    console.log(`Excerpt: ${data.contentEn.substring(0, 150)}...`);
  });
  process.exit(0);
}
main();
