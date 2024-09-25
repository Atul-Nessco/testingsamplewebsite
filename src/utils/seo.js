import { getLocalizedSlug } from '@/utils/getLocalizedSlug';

// Define available languages and countries
const availableLanguages = ['en', 'fr', 'hi'];  // Add more languages if needed
const availableCountries = ['in','fr'];  // Define available countries

export const generateHreflangTags = (currentCountry, currentLang, localizedPage = '', baseUrl) => {
  const hreflangTags = [];

  // Ensure base URL is valid
  if (!baseUrl) {
    throw new Error('Base URL is required to generate hreflang tags');
  }

  // Ensure localizedPage is provided
  const pageSlug = localizedPage || 'default-page';  // Fallback if localizedPage is not defined

  availableCountries.forEach((country) => {
    availableLanguages.forEach((lang) => {
      const localizedSlug = getLocalizedSlug(lang, pageSlug);
      const url = `${baseUrl}/${country}/${lang}/${localizedSlug}`;

      // Add hreflang tag for each language-country combination
      hreflangTags.push({
        lang: `${lang}-${country}`,
        url,
      });

      // Add x-default hreflang tag for English (or primary language)
      if (lang === 'en') {
        hreflangTags.push({
          lang: 'x-default',
          url: `${baseUrl}/${country}/en/${localizedSlug}`,
        });
      }
    });
  });

  return hreflangTags;
};
