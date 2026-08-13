import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';

const firebaseConfig = {
  projectId: "guianegocios-prod",
  appId: "1:437513389633:web:0092afd8a8ad1bd27de8c0",
  storageBucket: "guianegocios-prod.firebasestorage.app",
  apiKey: "AIzaSyBXDGFQACWzLwr1yBRKBloEUDfenfsg7dY",
  authDomain: "guianegocios-prod.firebaseapp.com",
  messagingSenderId: "437513389633",
  measurementId: "G-4E8GG9X33H",
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);



// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase AI Logic (Gemini Developer API)
export const ai = getAI(app, { backend: new GoogleAIBackend() });

// Export Gemini Flash 3 model with fallback capability
const modelCandidates = ['gemini-3.0-flash', 'gemini-3-flash', 'gemini-2.5-flash'];

export const aiModel = {
  async generateContent(prompt: any) {
    let lastError: any = null;
    for (const modelName of modelCandidates) {
      try {
        const model = getGenerativeModel(ai, { 
          model: modelName,
          generationConfig: {
            temperature: 0.7,
          }
        });
        return await model.generateContent(prompt);
      } catch (err: any) {
        console.warn(`Model ${modelName} attempt note:`, err?.message || err);
        lastError = err;
      }
    }
    throw lastError;
  }
};

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Cloud Functions
export const functions = getFunctions(app);
