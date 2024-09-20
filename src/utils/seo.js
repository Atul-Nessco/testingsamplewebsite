// seo.js
import { getLocalizedSlug } from '@/utils/getLocalizedSlug';

// Define the available language-country combinations
const availableLanguages = ['en', 'fr', 'hi'];  // Add more languages if needed
const availableCountries = ['in'];  // Define available countries

export const generateHreflangTags = (currentCountry, currentLang, localizedPage, baseUrl) => {
  const hreflangTags = [];

  availableCountries.forEach((country) => {
    availableLanguages.forEach((lang) => {
      const localizedSlug = getLocalizedSlug(lang, localizedPage);
      const url = `${baseUrl}/${country}/${lang}/${localizedSlug}`;

      // Add the default hreflang tag (e.g., "en-IN")
      hreflangTags.push({
        lang: `${lang}-${country}`,
        url,
      });

      // Add x-default hreflang tag for the default page
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
