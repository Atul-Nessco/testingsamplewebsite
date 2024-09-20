const countryNames = {
    en: {
      in: 'India',
      fr: 'France',
    },
    fr: {
      in: 'Inde',
      fr: 'France',
    },
    hi: {
      in: 'भारत',
      fr: 'फ्रांस',
    }
  };
  
  export const getCountryNameByCode = (countryCode, lang = 'en') => {
    return countryNames[lang]?.[countryCode.toLowerCase()] || countryNames['en'][countryCode.toLowerCase()] || 'Unknown';
  };
  