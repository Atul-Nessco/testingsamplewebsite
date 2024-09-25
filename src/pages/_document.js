// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useRouter } from 'next/router';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // Access the language (lang) and country parameters from the query.
    const { lang = 'en' } = this.props.__NEXT_DATA__.query || {}; // default to 'en' if not present

    return (
      <Html lang={lang}>
        <Head>
          {/* You can add additional head elements here */}
          <meta name="google-site-verification" content="ikClytgU_EOmadP85IyHWHzVI5JDsCEE2MX2zqXYVPs" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
