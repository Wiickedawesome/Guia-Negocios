import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

export const generateBlogEmbedding = onDocumentWritten(
  { document: "blogs/{blogId}", timeoutSeconds: 120, memory: "512MiB" },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const afterData = snap.after.data();
    if (!afterData) return; // Deleted

    // If embedding already exists and content hasn't changed, skip
    const beforeData = snap.before?.data();
    if (afterData.embedding && beforeData?.content === afterData.content) {
      return;
    }

    if (!afterData.content) return;

    try {
      const { generateEmbeddingWithAi } = await import("./ai.js");
      
      // Strip markdown/html to get raw text for better embedding
      const rawText = afterData.content.replace(/<[^>]+>/g, '').substring(0, 5000); 
      
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
