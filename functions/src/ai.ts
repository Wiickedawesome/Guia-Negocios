import { GoogleGenAI } from '@google/genai';
import { getFirestore } from 'firebase-admin/firestore';

const PROJECT_ID = process.env.GCLOUD_PROJECT || 'guianegocios-prod';
// Gemini 3.x models are served from the Vertex AI `global` endpoint.
const LOCATION = process.env.VERTEX_LOCATION || 'global';

// Initialize official Vertex AI backend (charged to Firebase/GCP Blaze credits)
export const vertexGenAI = new GoogleGenAI({
  vertexai: true,
  project: PROJECT_ID,
  location: LOCATION
});

export const ACTIVE_VERTEX_MODELS = [
  'gemini-3.7-flash',
  'gemini-3.7-flash-lite',
  'gemini-3.6-flash'
];

export interface AiGenerateOptions {
  model?: string;
  temperature?: number;
  responseMimeType?: string;
  systemInstruction?: string;
}

/**
 * Universal server-side AI content generator.
 * Prioritizes Vertex AI (billed to Firebase / GCP Blaze credit),
 * falling back to custom API key if configured.
 */
export async function generateContentWithAi(
  prompt: string,
  options: AiGenerateOptions = {}
): Promise<string> {
  const modelName = options.model || 'gemini-3.7-flash';
  const modelsToTry = [
    modelName,
    ...ACTIVE_VERTEX_MODELS.filter(m => m !== modelName)
  ];

  let lastError: any = null;

  // 1. Try Vertex AI via Google Cloud / Firebase Application Default Credentials
  for (const m of modelsToTry) {
    try {
      const config: any = {};
      if (options.temperature !== undefined) config.temperature = options.temperature;
      if (options.responseMimeType) config.responseMimeType = options.responseMimeType;
      if (options.systemInstruction) config.systemInstruction = options.systemInstruction;

      const response = await vertexGenAI.models.generateContent({
        model: m,
        contents: prompt,
        config: Object.keys(config).length > 0 ? config : undefined
      });

      const text = response.text;
      if (text) {
        return text;
      }
    } catch (err: any) {
      console.warn(`Vertex AI attempt with model ${m} failed:`, err?.message || err);
      lastError = err;
    }
  }

  // 2. Fallback: If Vertex AI fails, check if a Gemini API key is configured in settings
  try {
    const db = getFirestore();
    const settingsDoc = await db.collection('settings').doc('admin').get();
    const geminiKey = settingsDoc.exists ? settingsDoc.data()?.geminiKey : '';
    const apiKey = geminiKey || process.env.GEMINI_API_KEY;

    if (apiKey) {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const fallbackGenAI = new GoogleGenerativeAI(apiKey);
      for (const m of modelsToTry) {
        try {
          const genConfig: any = {};
          if (options.temperature !== undefined) genConfig.temperature = options.temperature;
          if (options.responseMimeType) genConfig.responseMimeType = options.responseMimeType;

          const model = fallbackGenAI.getGenerativeModel({
            model: m,
            generationConfig: Object.keys(genConfig).length > 0 ? genConfig : undefined
          });
          const result = await model.generateContent(prompt);
          const text = result.response.text();
          if (text) return text;
        } catch (fbErr: any) {
          console.warn(`Fallback Gemini API key attempt (${m}) failed:`, fbErr?.message || fbErr);
        }
      }
    }
  } catch (settingsErr) {
    console.warn("Could not check Gemini API key fallback:", settingsErr);
  }

  throw lastError || new Error("Failed to generate content using Vertex AI / AI fallback.");
}

/**
 * Firestore caps vector fields at 2048 dimensions; `gemini-embedding-001`
 * defaults to 3072. Every write without this cap was rejected with
 * "Vectors must be at most 2048 dimensions", which is why no blog document
 * ever stored an `embedding` and the vector-based internal linking silently
 * fell through to its empty branch.
 */
const EMBEDDING_DIMENSIONS = 2048;

/**
 * Generate vector embeddings using Vertex AI (gemini-embedding-001), truncated
 * to the dimensionality Firestore accepts.
 */
export async function generateEmbeddingWithAi(text: string): Promise<number[]> {
  try {
    const response = await vertexGenAI.models.embedContent({
      model: 'gemini-embedding-001',
      contents: text,
      config: { outputDimensionality: EMBEDDING_DIMENSIONS }
    });

    const values = response.embeddings?.[0]?.values || (response as any).embedding?.values;
    if (values && values.length > 0) {
      return values;
    }
  } catch (err: any) {
    console.warn("Vertex AI embedContent note:", err?.message || err);
  }

  // Fallback to Gemini Developer API if key exists
  try {
    const db = getFirestore();
    const settingsDoc = await db.collection('settings').doc('admin').get();
    const geminiKey = settingsDoc.exists ? settingsDoc.data()?.geminiKey : '';
    const apiKey = geminiKey || process.env.GEMINI_API_KEY;
    if (apiKey) {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
      const embedResult = await embedModel.embedContent(text);
      const values = embedResult?.embedding?.values;
      // This client cannot request a smaller output, so it returns the model
      // default and Firestore would reject the write. Return nothing rather
      // than a vector the caller can only fail on.
      if (values?.length === EMBEDDING_DIMENSIONS) {
        return values;
      }
      if (values) {
        console.warn(
          `Fallback embedding returned ${values.length} dimensions; Firestore accepts at most ${EMBEDDING_DIMENSIONS}.`
        );
      }
    }
  } catch (e) {
    console.warn("Fallback embedding failed:", e);
  }

  throw new Error("Failed to generate embedding with Vertex AI or fallback.");
}
