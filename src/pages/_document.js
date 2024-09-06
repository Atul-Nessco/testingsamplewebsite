import Document, { Html, Head, Main, NextScript } from 'next/document';
import seo from '@/utils/seo';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { country, lang } = ctx.query;
    
    const locales = ['en', 'fr', 'jp', 'bn']; // Dynamically generated list of supported locales
    
    const hreflangs = seo.getHreflangTags(country, lang, locales);
    return { ...initialProps, hreflangs, lang };
  }

  render() {
    return (
      <Html lang={this.props.lang || 'en'}>
        <Head>
          {this.props.hreflangs.map((hreflang, index) => (
            <link
              key={index}
              rel="alternate"
              hrefLang={hreflang.lang}
              href={hreflang.url}
            />
          ))}
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
