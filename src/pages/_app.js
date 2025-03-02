import '@/styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="ikClytgU_EOmadP85IyHWHzVI5JDsCEE2MX2zqXYVPs" />
        <meta name="robots" content="index,follow" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
