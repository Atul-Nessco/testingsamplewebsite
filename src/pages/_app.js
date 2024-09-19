import '@/styles/globals.css';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { country, lang } = router.query; // Dynamic parameters

  return (
    <>
      <Head>
        {/* Add hreflang tags dynamically */}
        {pageProps.hreflangs?.map((hreflang, index) => (
          <link
            key={index}
            rel="alternate"
            hrefLang={hreflang.lang}
            href={hreflang.url}
          />
        ))}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
