import Link from 'next/link';
import { getLocalizedSlug } from '@/utils/getLocalizedSlug';
import { useRouter } from 'next/router';
import { getLocaleData } from '@/utils/getLocaleData';
import { getCountryNameByCode } from '@/utils/getCountryNameByCode';
import { generateHreflangTags } from '@/utils/seo';  // Import hreflang generator function
import Head from 'next/head';

export default function HomePage({ localeData, countryName, hreflangTags }) {
  const router = useRouter();
  const { country, lang } = router.query;

  return (
    <>
      <Head>
        <title>{`${localeData?.title || 'Home'} (${countryName})`}</title>
        <meta name="description" content={localeData?.content || 'Default content'} />
        
        {/* Generate hreflang tags dynamically */}
        {hreflangTags.map((hreflang) => (
          <link
            key={hreflang.lang}
            rel="alternate"
            hrefLang={hreflang.lang}
            href={hreflang.url}
          />
        ))}

        {/* Fallback to default English India hreflang */}
        <link rel="alternate" hrefLang="x-default" href={`/${country}/${lang}`} />
      </Head>

      <main>
        <h1>{localeData?.title || 'Welcome to our website'}</h1>
        <p>{localeData?.content || 'This is the homepage.'}</p>

        <Link href={`/${country}/${lang}/${getLocalizedSlug(lang, 'about')}`}>
          <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
            {`${localeData?.aboutButton || 'About Us'}`}
          </button>
        </Link>

        <Link href={`/${country}/${lang}/${getLocalizedSlug(lang, 'contact')}`}>
          <button style={{ padding: '10px 20px', cursor: 'pointer', marginLeft: '10px' }}>
            {`${localeData?.contactButton || 'Contact Us'} ${countryName}`}
          </button>
        </Link>
      </main>
    </>
  );
}

export async function getServerSideProps({ params, req, res }) {
  const { country, lang } = params;

  // Handle requests for favicon or other static files early
  if (req.url === '/favicon.ico') {
    // Avoid further processing for favicon requests
    res.statusCode = 204; // No Content
    return { props: {} };
  }

  // Fetch the localized country name and locale data
  const countryName = await getCountryNameByCode(country, lang);
  let localeData = await getLocaleData(lang, 'common');
  if (!localeData) {
    localeData = await getLocaleData('en', 'common'); // Fallback to English
  }

  // Generate dynamic hreflang tags based on available languages and countries
  const baseUrl = `https://${req.headers.host}`;
  const localizedPage = 'home';  // Assuming 'home' is the current page
  const hreflangTags = generateHreflangTags(country, lang, localizedPage, baseUrl);

  return {
    props: {
      localeData,
      countryName,
      hreflangTags,  // Pass the hreflang tags to the component
    },
  };
}

