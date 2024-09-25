import { getLocaleData } from '@/utils/getLocaleData';
import { getCountryNameByCode } from '@/utils/getCountryNameByCode';
import { getLocalizedSlug, detectSlugLanguage } from '@/utils/getLocalizedSlug';
import { generateHreflangTags } from '@/utils/seo';  // Import hreflang tag generator
import Head from 'next/head';

export default function LocalizedPage({ localeData, countryName, hreflangs }) {
  return (
    <>
      <Head>
        <title>{`${localeData?.title || 'Page'} (${countryName})`}</title>
        <meta name="description" content={localeData?.content || 'Default content'} />
        <meta name="google-site-verification" content="ikClytgU_EOmadP85IyHWHzVI5JDsCEE2MX2zqXYVPs" />
        {hreflangs.map((hreflang) => (
          <link key={hreflang.lang} rel="alternate" hrefLang={hreflang.lang} href={hreflang.url} />
        ))}
      </Head>
      <main>
        <h1>{localeData?.title || 'Localized Page'}</h1>
        <p>{`${localeData?.content} ${countryName}.`}</p>
      </main>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  const { country, lang, localizedPage } = params;

  // Fetch the localized country name based on the country code and language
  const countryName = await getCountryNameByCode(country, lang);

  // Identify the language of the current slug
  const detectedSlugLanguage = detectSlugLanguage(localizedPage);

  // If the detected language of the slug doesn't match the language in the URL, redirect
  if (detectedSlugLanguage !== lang) {
    return {
      redirect: {
        destination: `/${country}/${lang}/`, // Redirect to the correct language root
        permanent: false,
      },
    };
  }

  // Fetch the locale data for the requested page
  const localeData = await getLocaleData(lang, localizedPage);

  if (!localeData) {
    return {
      notFound: true,
    };
  }

  // Generate dynamic hreflang tags for SEO
  const baseUrl = `https://${req.headers.host}`;
  const hreflangs = generateHreflangTags(country, lang, localizedPage, baseUrl);

  return {
    props: {
      localeData,
      countryName,
      hreflangs,  // Pass the hreflang tags to the component
    },
  };
}
