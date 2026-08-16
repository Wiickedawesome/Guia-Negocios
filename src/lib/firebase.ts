import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  projectId: "guianegocios-prod",
  appId: "1:437513389633:web:0092afd8a8ad1bd27de8c0",
  storageBucket: "guianegocios-prod.firebasestorage.app",
  apiKey: "AIzaSyBXDGFQACWzLwr1yBRKBloEUDfenfsg7dY",
  authDomain: "guianegocios-prod.firebaseapp.com",
  messagingSenderId: "437513389633",
  measurementId: "G-4E8GG9X33H",
};

// Initialize Firebase App singleton
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Cloud Functions
export const functions = getFunctions(app);

// Initialize Firebase App Check for Web
export const RECAPTCHA_SITE_KEY = "6LfS1oMtAAAAADOn7vSke2FTZ9YgprAc9iUBIWIL";

export let appCheck: any = null;
if (typeof window !== 'undefined') {
  try {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN ?? true;
    }
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
  } catch (err: any) {
    console.warn("App Check initialization note:", err?.message || err);
  }
}

// Initialize Firebase AI Logic
export const ai = getAI(app, { backend: new GoogleAIBackend() });

// Default active Gemini API Key
export const DEFAULT_GEMINI_KEY = 'AQ.Ab8RN6LBgrMKX5ptupNN-2XRgEWoI9RJzqknms5CvtU88cNdoQ';

// Cached Gemini API Key helper
let cachedGeminiKey: string | null = null;

export async function getGeminiApiKey(): Promise<string> {
  if (cachedGeminiKey) return cachedGeminiKey;

  // 1. Check local storage (browser)
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('gemini_api_key');
    if (localKey && localKey.trim()) {
      cachedGeminiKey = localKey.trim();
      return cachedGeminiKey;
    }
  }

  // 2. Check environment variable if available
  const envKey = (import.meta as any).env?.PUBLIC_GEMINI_API_KEY || (typeof window !== 'undefined' && (window as any).GEMINI_API_KEY);
  if (envKey && envKey.trim()) {
    cachedGeminiKey = envKey.trim();
    return cachedGeminiKey;
  }

  // 3. Fetch from Firestore settings/admin
  try {
    const settingsSnap = await getDoc(doc(db, 'settings', 'admin'));
    if (settingsSnap.exists()) {
      const data = settingsSnap.data();
      if (data?.geminiKey && data.geminiKey.trim()) {
        cachedGeminiKey = data.geminiKey.trim();
        if (typeof window !== 'undefined') {
          localStorage.setItem('gemini_api_key', cachedGeminiKey);
        }
        return cachedGeminiKey;
      }
    }
  } catch (e) {
    console.warn("Could not fetch geminiKey from Firestore settings:", e);
  }

  // 4. Default fallback key
  cachedGeminiKey = DEFAULT_GEMINI_KEY;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('gemini_api_key', DEFAULT_GEMINI_KEY);
    } catch {}
  }
  return DEFAULT_GEMINI_KEY;
}

// Active Gemini 3.x models (Gemini 2.x and 2.5 series are retired)
export const ACTIVE_GEMINI_MODELS = [
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-3.6-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.1-pro-preview'
];

// Call Google Generative AI Developer REST API directly
export async function callGeminiRestApi(prompt: string, apiKey: string, modelName = 'gemini-3.5-flash'): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7 }
    })
  });

  if (!response.ok) {
    const errBody = await response.text();
    let errorMsg = `Gemini REST API error (${response.status}): ${errBody}`;
    try {
      const parsed = JSON.parse(errBody);
      if (parsed.error?.message) {
        errorMsg = parsed.error.message;
      }
    } catch {}
    throw new Error(errorMsg);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response returned from Gemini REST API");
  }
  return text;
}

/**
 * Validates a Gemini API Key against Google's API
 */
export async function testGeminiApiKey(apiKey: string): Promise<{ valid: boolean; model?: string; error?: string }> {
  for (const model of ACTIVE_GEMINI_MODELS.slice(0, 3)) {
    try {
      const res = await callGeminiRestApi('Say OK.', apiKey, model);
      if (res) return { valid: true, model };
    } catch (e: any) {
      if (e?.message?.includes('API key not valid')) {
        return { valid: false, error: 'Invalid API key format or credentials.' };
      }
      if (e?.message?.includes('credits are depleted') || e?.message?.includes('billing')) {
        return { valid: false, error: 'Prepayment credits depleted on this project.' };
      }
      if (e?.message?.includes('quota') || e?.message?.includes('Rate limit')) {
        return { valid: false, error: 'Rate limit or quota reached on this key.' };
      }
    }
  }
  return { valid: false, error: 'Unable to connect with this key on active Gemini models.' };
}

/**
 * Universal AI Model wrapper that provides:
 * 1. Direct Gemini Developer REST API using configured API key
 * 2. Firebase AI Logic with App Check fallback
 * 3. Server-side Callable Cloud Function fallback
 */
export const aiModel = {
  async generateContent(prompt: any) {
    const promptStr = typeof prompt === 'string' ? prompt : (prompt?.contents?.[0]?.parts?.[0]?.text || JSON.stringify(prompt));
    let lastError: any = null;

    // --- Tier 1: Try Direct Gemini REST API with API Key ---
    try {
      const apiKey = await getGeminiApiKey();
      if (apiKey) {
        for (const modelName of ACTIVE_GEMINI_MODELS) {
          try {
            const text = await callGeminiRestApi(promptStr, apiKey, modelName);
            return {
              response: {
                text: () => text
              }
            };
          } catch (restErr: any) {
            console.warn(`Gemini REST (${modelName}) note:`, restErr?.message || restErr);
            lastError = restErr;
          }
        }
      }
    } catch (apiKeyErr) {
      console.warn("Direct Gemini REST attempt error:", apiKeyErr);
    }

    // --- Tier 2: Try Firebase AI Logic (with App Check) ---
    for (const modelName of ACTIVE_GEMINI_MODELS) {
      try {
        const model = getGenerativeModel(ai, { 
          model: modelName,
          generationConfig: {
            temperature: 0.7,
          }
        });
        return await model.generateContent(prompt);
      } catch (err: any) {
        console.warn(`Firebase AI Logic (${modelName}) note:`, err?.message || err);
        lastError = err;
      }
    }

    // --- Tier 3: Try Callable Cloud Function (Server-Side) ---
    try {
      const generateAiFn = httpsCallable(functions, 'generateAiContent');
      const fnResult = await generateAiFn({ prompt: promptStr });
      const text = (fnResult.data as any)?.text;
      if (text) {
        return {
          response: {
            text: () => text
          }
        };
      }
    } catch (fnErr: any) {
      console.warn("Callable Cloud Function generateAiContent note:", fnErr?.message || fnErr);
      if (!lastError) lastError = fnErr;
    }

    // If all failed, provide a friendly actionable error message
    const msg = lastError?.message || 'Unknown AI error';
    if (msg.includes('credits are depleted') || msg.includes('billing')) {
      throw new Error("Your Gemini credits are depleted on this project. Please check AI Studio billing or update your key in Settings.");
    }
    if (msg.includes('403') || msg.includes('deactivated') || msg.includes('App Check')) {
      throw new Error("Firebase AI Logic App Check is verifying. Please ensure your active Gemini API key is set in Admin > Settings.");
    }
    throw lastError || new Error("Failed to generate content with AI. Please check your Gemini API Key in Settings.");
  }
};

