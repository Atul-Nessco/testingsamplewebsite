import fs from 'fs';
import path from 'path';

export const getLocaleData = async (lang) => {
  // Check if it's server-side rendering (SSR)
  if (typeof window === 'undefined') {
    // Server-side: Use fs to read the locale file
    const filePath = path.join(process.cwd(), 'public', 'locales', `${lang}.json`);
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents);
    } catch (error) {
      console.error(`Locale file for ${lang} not found. Defaulting to English.`);
      const fallbackFilePath = path.join(process.cwd(), 'public', 'locales', 'en.json');
      const fallbackContents = fs.readFileSync(fallbackFilePath, 'utf8');
      return JSON.parse(fallbackContents);
    }
  } else {
    // Client-side: Use fetch to get locale file
    try {
      const response = await fetch(`/locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Locale file for ${lang} not found.`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error loading locale data: ${error.message}`);
      
      // Fallback to English if locale not found
      const fallbackResponse = await fetch('/locales/en.json');
      return await fallbackResponse.json();
    }
  }
};
