import en from './en.json';
import es from './es.json';

const translations = { en, es };

export type Language = 'en' | 'es';
export const defaultLang = 'es';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: string) {
    const keys = key.split('.');
    let current: any = translations[lang];
    for (const k of keys) {
      if (current === undefined) break;
      current = current[k];
    }
    return current || key; // fallback to key if not found
  }
}
