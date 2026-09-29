import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from './locales/en-US.json';
import enGB from './locales/en-GB.json';
import viVN from './locales/vi-VN.json';

export const STORAGE_KEY = 'i18nextLng';
export const SUPPORTED_LANGS = ['en-US', 'en-GB', 'vi-VN'] as const;

export const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const nextData = (window as unknown as { __NEXT_DATA__?: { locale?: string } }).__NEXT_DATA__;
    if (nextData?.locale && (SUPPORTED_LANGS as readonly string[]).includes(nextData.locale)) {
      return nextData.locale;
    }
    const path = window.location.pathname;
    for (const lang of SUPPORTED_LANGS) {
      if (path === `/${lang}` || path.startsWith(`/${lang}/`)) {
        return lang;
      }
    }
  }
  return 'en-US';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': { translation: enUS },
      'en-GB': { translation: enGB },
      'vi-VN': { translation: viVN },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en-US',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

// Persist language changes to Next.js cookie for automatic subpath mapping
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    document.cookie = `NEXT_LOCALE=${lng}; path=/; max-age=31536000; SameSite=Lax`;
  }
});

export default i18n;
