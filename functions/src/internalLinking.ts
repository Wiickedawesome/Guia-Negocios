import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

export const generateBlogEmbedding = onDocumentWritten(
  { document: "blogs/{blogId}", timeoutSeconds: 120, memory: "512MiB" },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const afterData = snap.after.data();
    if (!afterData) return; // Deleted

    // Blog documents store contentEs/contentEn (the old `content` field is
    // never written), so read both; a document with neither has nothing to
    // embed.
    const content = afterData.contentEs || afterData.contentEn || '';
    if (!content) return;

    // If embedding already exists and neither language body changed, skip
    const beforeData = snap.before?.data();
    if (
      afterData.embedding &&
      beforeData?.contentEs === afterData.contentEs &&
      beforeData?.contentEn === afterData.contentEn
    ) {
      return;
    }

    try {
      const { generateEmbeddingWithAi } = await import("./ai.js");
      
      // Strip markdown/html to get raw text for better embedding
      const rawText = content.replace(/<[^>]+>/g, '').substring(0, 5000); 
      
      const embeddingValues = await generateEmbeddingWithAi(rawText);

      // Update document with the vector embedding
      await snap.after.ref.update({
        embedding: FieldValue.vector(embeddingValues)
      });

      console.log(`Generated and saved vector embedding for blog: ${event.params.blogId}`);
    } catch (error) {
      console.error("Error generating blog embedding:", error);
    }
  }
);
