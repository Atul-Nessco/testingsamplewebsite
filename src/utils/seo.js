const getHreflangTags = (country, lang, locales) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://language.nesscoindustries.com';
  
  return locales.map((locale) => ({
    lang: `${locale}-${country}`, // Format as 'lang-country'
    url: `${baseURL}/${country}/${locale}`,
  }));
};

export default { getHreflangTags };
