import { useEffect, useState } from 'react';
import { getCountryCode } from '@/config/ipapi';

const useCountryLanguage = () => {
  const [country, setCountry] = useState(null);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const fetchCountryAndLanguage = async () => {
      const detectedCountry = await getCountryCode();
      const userLanguage = navigator.language.split('-')[0];
      setCountry(detectedCountry);
      setLanguage(userLanguage);
    };

    fetchCountryAndLanguage();
  }, []);

  return { country, language };
};

export default useCountryLanguage;
