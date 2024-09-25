export const generateHreflangTags = (currentCountry, currentLang, localizedPage = '', baseUrl) => {
  const availableLanguages = ['en', 'fr', 'hi'];  // Add more languages if needed
  const availableCountries = ['in', 'fr'];  // Define available countries

  const hreflangTags = [];

  availableCountries.forEach((country) => {
    availableLanguages.forEach((lang) => {
      // If we're on the root or home page, don't add the localized page slug
      const slug = localizedPage && localizedPage !== 'home' ? `/${localizedPage}` : '';
      const url = `${baseUrl}/${country}/${lang}${slug}`;

      hreflangTags.push({
        lang: `${lang}-${country}`,
        url,
      });

      // Add x-default hreflang for default language/country combo
      if (lang === 'en') {
        hreflangTags.push({
          lang: 'x-default',
          url: `${baseUrl}/${country}/en${slug}`,
        });
      }
    });
  });

  return hreflangTags;
};
