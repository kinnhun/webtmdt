import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from './locales/en-US.json';
import enGB from './locales/en-GB.json';
import viVN from './locales/vi-VN.json';

export const STORAGE_KEY = 'i18nextLng';
export const SUPPORTED_LANGS = ['en-US', 'en-GB', 'vi-VN'] as const;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': { translation: enUS },
      'en-GB': { translation: enGB },
      'vi-VN': { translation: viVN },
    },
    // ALWAYS init with en-US to match SSR/static HTML.
    // The saved language is applied AFTER hydration in _app.tsx useEffect.
    lng: 'en-US',
    fallbackLng: 'en-US',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

// Persist language changes to localStorage
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lng);
  }
});

export default i18n;
