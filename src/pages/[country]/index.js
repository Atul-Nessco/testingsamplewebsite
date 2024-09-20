import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function CountryPage() {
  const router = useRouter();
  const { country } = router.query;

  useEffect(() => {
    // Detect the browser's language
    const browserLanguage = navigator.language.split('-')[0] || 'en';

    // Redirect to the country route with the browser language
    router.replace(`/${country}/${browserLanguage}`);
  }, [country]);

  return <div>Redirecting to your preferred language...</div>;
}

// Handle server-side redirection as a fallback (just in case)
export async function getServerSideProps({ params }) {
  const { country } = params;

  // Fallback language if the browser's language is unavailable (server-side)
  const fallbackLang = 'en';

  return {
    redirect: {
      destination: `/${country}/${fallbackLang}`,
      permanent: false,
    },
  };
}
