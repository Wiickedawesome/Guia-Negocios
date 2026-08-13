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
      const db = getFirestore();
      const settingsDoc = await db.collection("settings").doc("admin").get();
      const geminiKey = settingsDoc.exists ? settingsDoc.data()?.geminiKey : "";
      if (!geminiKey) {
        console.error("Gemini API key is missing. Cannot generate embedding.");
        return;
      }

      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(geminiKey);
      
      // text-embedding-004 is the recommended embedding model
      const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
      
      // Strip markdown/html to get raw text for better embedding
      const rawText = afterData.content.replace(/<[^>]+>/g, '').substring(0, 5000); 
      
      const result = await model.embedContent(rawText);
      const embeddingValues = result.embedding.values;

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
