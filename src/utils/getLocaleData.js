import fs from 'fs';
import path from 'path';

const getLocaleData = async (lang) => {
  const filePath = path.resolve('./public/locales', `${lang}.json`);
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Locale file for ${lang} not found. Defaulting to English.`);
    return null;
  }
};

export default getLocaleData;
