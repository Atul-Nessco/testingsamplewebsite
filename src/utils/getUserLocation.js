export const getUserLocation = async () => {
    try {
      // Get user's IP-based location using IPAPI
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const countryCode = data.country_code.toLowerCase(); // Example: "in" for India
      return countryCode;
    } catch (error) {
      console.error('Error fetching user location:', error);
      return 'us'; // Fallback to 'us' if unable to detect location
    }
  };
  
  export const getUserLanguage = () => {
    // Get browser's default language
    const language = navigator.language || navigator.userLanguage;
    return language.split('-')[0]; // Extract language code (e.g., 'en' from 'en-US')
  };
  