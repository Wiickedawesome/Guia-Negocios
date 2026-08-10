import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "guianegocios-prod",
  appId: "1:437513389633:web:0092afd8a8ad1bd27de8c0",
  storageBucket: "guianegocios-prod.firebasestorage.app",
  apiKey: "AIzaSyBXDGFQACWzLwr1yBRKBloEUDfenfsg7dY",
  authDomain: "guianegocios-prod.firebaseapp.com",
  messagingSenderId: "437513389633",
  measurementId: "G-4E8GG9X33H",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function main() {
  const snapshot = await getDocs(collection(db, 'blogs'));
  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`\n========================================`);
    console.log(`DOC ID: ${doc.id}`);
    console.log(`slugEs: ${data.slugEs}`);
    console.log(`slugEn: ${data.slugEn}`);
    console.log(`titleEs: ${data.titleEs}`);
    console.log(`titleEn: ${data.titleEn}`);
    console.log(`metaDesc: ${data.metaDesc}`);
    console.log(`keywords: ${JSON.stringify(data.keywords)}`);
    console.log(`publishDate: ${data.publishDate}`);
    console.log(`featuredImage: ${data.featuredImage}`);
    console.log(`--- Content Snippet (ES) ---`);
    console.log((data.contentEs || '').substring(0, 300));
  });
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
