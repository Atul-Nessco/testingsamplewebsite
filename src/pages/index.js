import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState('Loading...');

  useEffect(() => {
    const detectLanguageAndCountry = async () => {
      try {
        // Detect user's language
        const userLanguage = navigator.language || navigator.userLanguage;
        const languageCode = userLanguage.split('-')[0]; // Extract language code

        // Fetch country data using IPAPI
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code.toLowerCase();
        const countryName = data.country_name;

        // List of available languages
        const availableLanguages = ['en', 'fr', 'bn', 'hi'];

        // Determine the language to use, default to English if not found
        const lang = availableLanguages.includes(languageCode) ? languageCode : 'en';

        // Set the page title based on detected language and country
        const languageTitles = {
          en: 'Testing in English',
          fr: 'Testing in French',
          bn: 'Testing in Bangla',
          hi: 'Testing in Hindi',
        };

        const pageTitle = languageTitles[lang] || 'Testing';
        setTitle(`${pageTitle} (${countryName})`);

        // Redirect to the appropriate URL
        router.replace(`/${countryCode}/${lang}`);
      } catch (error) {
        console.error('Error detecting language and country:', error);
        setTitle('Error');
      }
    };

    detectLanguageAndCountry();
  }, [router]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
}
