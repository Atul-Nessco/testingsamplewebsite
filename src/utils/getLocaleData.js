import fs from 'fs';
import path from 'path';

// Slug mapping from localized names to generic page names
const localizedSlugToGenericName = {
  'contactez-nous': 'contact',
  'à-propos': 'about',
  'संपर्क': 'contact',
  'हमारे-बारे-में': 'about',
};

export const getLocaleData = async (lang, localizedPage) => {
  // Map the localized slug to the generic name
  const genericPage = localizedSlugToGenericName[localizedPage] || localizedPage;

  if (typeof window === 'undefined') {
    // Server-side: Use fs to read locale files
    const filePath = path.join(process.cwd(), 'public', 'locales', lang, `${genericPage}.json`);
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
      console.error(`Locale file for ${lang}/${genericPage}.json not found. Falling back to English.`);
      const fallbackPath = path.join(process.cwd(), 'public', 'locales', 'en', `${genericPage}.json`);
      return JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
    }
  } else {
    // Client-side: Fetch locale file
    const response = await fetch(`/locales/${lang}/${genericPage}.json`);
    if (!response.ok) {
      const fallbackResponse = await fetch(`/locales/en/${genericPage}.json`);
      return await fallbackResponse.json();
    }
    return await response.json();
  }
};
