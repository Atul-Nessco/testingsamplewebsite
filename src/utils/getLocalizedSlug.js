const localizedSlugs = {
    en: {
      'about': 'about',
      'contact': 'contact',
    },
    fr: {
      'about': 'à-propos',
      'contact': 'contactez-nous',
    },
    hi: {
      'about': 'हमारे-बारे-में',
      'contact': 'संपर्क',
    },
  };
  
  // Get the correct slug based on the language, fallback to default language or page name
  export const getLocalizedSlug = (lang, page) => {
    // Check if the language exists in the localizedSlugs object
    if (localizedSlugs[lang]) {
      return localizedSlugs[lang][page] || page;
    } else {
      console.warn(`Language "${lang}" not found, falling back to default page "${page}".`);
      return page; // Fallback to the original page name if language is not found
    }
  };
  
  // Function to detect the language of a given slug
  export const detectSlugLanguage = (slug) => {
    // Loop through each language in the localizedSlugs object
    for (const lang in localizedSlugs) {
      // Loop through each page key (about, contact) and their corresponding slugs in each language
      for (const page in localizedSlugs[lang]) {
        if (localizedSlugs[lang][page] === slug) {
          return lang; // Return the language code if a match is found
        }
      }
    }
    return null; // Return null if no matching language is found for the slug
  };
  