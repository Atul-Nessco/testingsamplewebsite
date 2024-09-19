// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getLocaleData } from '@/utils/getLocaleData';
// import { getCountryNameByCode } from '@/utils/getCountryNameByCode';

// export default function DynamicPage() {
//   const router = useRouter();
//   const { country, lang } = router.query;
//   const [localeData, setLocaleData] = useState(null);
//   const [countryName, setCountryName] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!country || !lang) return;

//       try {
//         const fetchedCountryName = await getCountryNameByCode(country);
//         setCountryName(fetchedCountryName);

//         const fetchedLocaleData = await getLocaleData(lang);
//         setLocaleData(fetchedLocaleData || await getLocaleData('en'));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [country, lang]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <>
//       <head>
//         <title>{`${localeData?.title || 'Welcome'} (${countryName || 'Unknown Country'})`}</title>
//         <meta name="description" content={localeData?.content || 'Default description'} />
//       </head>
//       <main>
//         <h1>{localeData?.title || 'Welcome to our website'}</h1>
//         <p>{localeData?.content || 'Default content'}</p>
//       </main>
//     </>
//   );
// }



import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getLocaleData } from '@/utils/getLocaleData';
import { getCountryNameByCode } from '@/utils/getCountryNameByCode';
import getHreflangs from '@/utils/getHreflangs';
import Head from 'next/head';

export default function DynamicPage({ localeData, countryName, hreflangs }) {
  const [loading, setLoading] = useState(false);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>{`${localeData?.title || 'Welcome'} (${countryName})`}</title>
        <meta name="description" content={localeData?.content || 'Default description'} />
        {hreflangs.map((hreflang, index) => (
          <link key={index} rel="alternate" hrefLang={hreflang.lang} href={hreflang.url} />
        ))}
      </Head>
      <main>
        <h1>{localeData?.title || 'Welcome to our website'}</h1>
        <p>{localeData?.content || 'Default content'}</p>
      </main>
    </>
  );
}

// Get data dynamically at runtime
export async function getServerSideProps({ params }) {
  const { country, lang } = params;

  // Fetch country name based on the country code
  const countryName = await getCountryNameByCode(country);

  // Fetch locale data based on the language
  let localeData = await getLocaleData(lang);
  if (!localeData) {
    localeData = await getLocaleData('en'); // Default to English if the language is not supported.
  }

  // Define all available languages for generating hreflangs
  const availableLocales = ['en', 'fr', 'hi']; // Add more locales if needed

  // Generate hreflang tags dynamically
  const hreflangs = getHreflangs(country, lang, availableLocales);

  return {
    props: {
      localeData,
      countryName,
      hreflangs, // Pass hreflang tags to the page
    },
  };
}
