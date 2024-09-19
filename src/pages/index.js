import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserLocation, getUserLanguage } from '@/utils/getUserLocation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const redirectToLocale = async () => {
      // Fetch the user's location (country) and browser language
      const country = await getUserLocation();
      const language = getUserLanguage();

      // Redirect to the dynamic route based on country and language
      router.replace(`/${country}/${language}`);
    };

    redirectToLocale();
  }, [router]);

  return <div>Redirecting...</div>; // Optional loading or redirecting state
}
