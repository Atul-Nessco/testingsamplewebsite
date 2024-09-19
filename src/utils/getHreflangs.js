const getHreflangs = (country, lang, availableLocales) => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Generate hreflang tags for all available locales
    return availableLocales.map((locale) => ({
      lang: `${locale}-${country}`, // Example: "en-US", "fr-FR"
      url: `${baseURL}/${country}/${locale}`, // Example: "http://localhost:3000/in/en"
    }));
  };
  
  export default getHreflangs;
  