import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
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

// App Check is ENFORCED on Firestore, but server-side contexts (Astro build,
// SSG) run in Node where reCAPTCHA cannot issue tokens. Without this the whole
// build-time content pipeline silently fails and pages render empty.
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
} else if (process.env.APP_CHECK_DEBUG_TOKEN) {
  // SSG/Node build: use a registered debug token so Firestore queries succeed.
  (globalThis as any).FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.APP_CHECK_DEBUG_TOKEN;
  try {
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: false,
    });
  } catch (err: any) {
    console.warn("App Check (build) initialization note:", err?.message || err);
  }
}

// No Firebase AI Logic client here. The browser never calls Google's AI
// endpoints: every generation goes through the `generateAiContent` callable,
// which runs on Cloud Functions ADC. A user-provided key is only ever used by
// the Settings page key test.

// In-memory Gemini API key cache (never persisted to browser storage).
let cachedGeminiKey: string | null = null;

export async function getGeminiApiKey(): Promise<string> {
  if (cachedGeminiKey) return cachedGeminiKey;

  // 1. Optional runtime override. Deliberately NOT read from
  // import.meta.env.PUBLIC_*: Astro inlines those values into the client
  // bundle, which would ship the key to every visitor.
  const windowKey = typeof window !== 'undefined' ? (window as any).GEMINI_API_KEY : '';
  if (windowKey && String(windowKey).trim()) {
    cachedGeminiKey = String(windowKey).trim();
    return cachedGeminiKey;
  }

  // 2. Fetch from Firestore settings/admin (kept in memory for this session only)
  try {
    const settingsSnap = await getDoc(doc(db, 'settings', 'admin'));
    if (settingsSnap.exists()) {
      const data = settingsSnap.data();
      if (data?.geminiKey && data.geminiKey.trim()) {
        cachedGeminiKey = data.geminiKey.trim();
        return cachedGeminiKey;
      }
    }
  } catch (e) {
    console.warn("Could not fetch geminiKey from Firestore settings:", e);
  }

  // 3. No key configured — direct REST path will be skipped (Vertex AI handles it)
  return '';
}

// Models probed by the Settings page key test. Generation does not use this
// list — the server owns model selection.
export const ACTIVE_GEMINI_MODELS = [
  'gemini-3.7-flash',
  'gemini-3.7-flash-lite',
  'gemini-3.6-flash'
];

// Call Google Generative AI Developer REST API directly
export async function callGeminiRestApi(prompt: string, apiKey: string, modelName = 'gemini-3.7-flash'): Promise<string> {
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
 * Normalizes the loose prompt shapes admin pages pass in.
 */
function toPromptText(prompt: any): string {
  if (typeof prompt === 'string') {
    return prompt;
  }
  const fromParts = prompt?.contents?.[0]?.parts?.[0]?.text;
  return fromParts || JSON.stringify(prompt);
}

/**
 * Sends a prompt to the `generateAiContent` callable and returns its text.
 *
 * The callable owns model selection, Vertex AI credentials and App Check
 * enforcement, so there is no client-side model list to drift out of date.
 */
async function requestGeneratedText(promptText: string): Promise<string> {
  const generateAi = httpsCallable(functions, 'generateAiContent');
  const { data } = await generateAi({ prompt: promptText });
  const text = (data as { text?: string })?.text;
  if (!text) {
    throw new Error('The AI service returned an empty response.');
  }
  return text;
}

/**
 * Single entry point for admin-side AI generation.
 *
 * Errors are surfaced verbatim: the previous multi-tier version rewrote every
 * 403 as "authenticating, try again", which hid permanent failures.
 */
export const aiModel = {
  async generateContent(prompt: any) {
    try {
      const text = await requestGeneratedText(toPromptText(prompt));
      return { response: { text: () => text } };
    } catch (err: any) {
      console.error('AI generation failed:', err);
      const codeSuffix = err?.code ? ` (${err.code})` : '';
      const message = err?.message || 'Unknown AI error';
      throw new Error(`AI generation failed${codeSuffix}: ${message}`);
    }
  }
};

