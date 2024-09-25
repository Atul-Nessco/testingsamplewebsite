import Document, { Html, Head, Main, NextScript } from 'next/document';
import { generateHreflangTags } from '@/utils/seo';  // Updated hreflang generator function

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { query, asPath } = ctx;
    const { lang = 'en', country = 'in' } = query; // Default to 'en' and 'in'

    let hreflangTags = [];
    let baseUrl = 'http://localhost'; // Fallback if req is not available

    // Only generate hreflang tags if we're on the server and have access to ctx.req
    if (ctx.req && ctx.req.headers.host) {
      baseUrl = `https://${ctx.req.headers.host}`;
    }

    // Extract the current page slug from the URL (removing query params if any)
    const pathSegments = asPath.split('?')[0].split('/').filter(Boolean);

    // The localized page is not the language or country, so we skip the first two parts of the path
    const localizedPage = pathSegments.length > 2 ? pathSegments[2] : ''; // Only use if it's a valid page slug

    // Generate hreflang tags using the updated utility function
    hreflangTags = generateHreflangTags(country, lang, localizedPage, baseUrl);

    return { ...initialProps, lang, country, hreflangTags };
  }

  render() {
    const { lang, hreflangTags } = this.props;

    return (
      <Html lang={lang}>
        <Head>
          {/* Render hreflang tags dynamically */}
          {hreflangTags && hreflangTags.map((hreflang) => (
            <link
              key={hreflang.lang}
              rel="alternate"
              hrefLang={hreflang.lang}
              href={hreflang.url}
            />
          ))}

          {/* Additional head elements */}
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
