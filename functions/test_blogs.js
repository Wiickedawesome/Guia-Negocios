const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
  credential: applicationDefault(),
  projectId: 'guianegocios-prod'
});
const db = getFirestore();

async function checkBlogs() {
  const snapshot = await db.collection('blogs').get();
  snapshot.forEach(doc => {
    console.log(`ID: ${doc.id}`);
    console.log(`Title: ${doc.data().title}`);
    console.log(`Cover: ${doc.data().coverImage}`);
    console.log('---');
  });
}
checkBlogs();
