import { useRouter } from 'next/router';
import Head from 'next/head';
import getLocaleData from '@/utils/getLocaleData';
import { getCountryNameByCode } from '@/config/ipapi';

const HomePage = ({ localeData, countryName }) => {
  return (
    <>
      <Head>
        <title>{`${localeData.title} (${countryName})`}</title>
        <meta name="description" content={localeData.content} />
      </Head>
      <div>
        <p>{localeData.content}</p>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { country, lang } = context.params;

  // Fetch country name based on the country code from the URL
  const countryName = await getCountryNameByCode(country);

  // Fetch locale data based on the language
  let localeData = await getLocaleData(lang);
  if (!localeData) {
    localeData = await getLocaleData('en'); // Default to English if the language is not supported.
  }

  return {
    props: {
      localeData,
      countryName,
    },
  };
}

export default HomePage;
