import '@/styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="google059bd1b2c050b28b.html" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
