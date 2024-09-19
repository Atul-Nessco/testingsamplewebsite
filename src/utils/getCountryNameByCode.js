export const getCountryNameByCode = async (countryCode) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      const data = await response.json();
      return data[0].name.common; // Get the common name of the country
    } catch (error) {
      console.error('Error fetching country name:', error);
      return 'Unknown'; // Fallback in case of an error
    }
  };
  