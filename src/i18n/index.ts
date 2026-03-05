import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // .use(
  //   resourcesToBackend(
  //     (language, namespace) =>
  //       import(`../../public/locales/${language}/${namespace}.json`),
  //   ),
  // )
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ua'],
    ns: ['common'],
    defaultNS: 'common',
    debug: import.meta.env.DEV,

    detection: {
      order: ['path', 'navigator', 'localStorage'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },

    backend: {
      loadPath: `${import.meta.env.VITE_API_BASE_URL}/translation/{{lng}}/{{ns}}`,
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

    saveMissing: false,
  });

i18n.on('failedLoading', (lng, ns, msg) => {
  console.warn(
    `Failed to load translation ${lng}/${ns}: ${msg}. Using fallback.`,
  );
});

export default i18n;
