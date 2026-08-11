import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({
  credential: applicationDefault(),
  projectId: "guianegocios-prod"
});
const db = getFirestore(app);

const postId = "PYzLgLPIdFcRpnryVTY7";
const featuredImage = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop";

async function updatePost() {
  const postRef = db.collection('blogs').doc(postId);
  await postRef.update({
    featuredImage: featuredImage,
    updatedAt: new Date().toISOString()
  });
  console.log(`Successfully updated blog post ${postId} with new image!`);
  process.exit(0);
}

updatePost().catch(err => {
  console.error(err);
  process.exit(1);
});
