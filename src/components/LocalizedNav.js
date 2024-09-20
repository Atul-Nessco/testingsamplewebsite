import Link from 'next/link';
import { useRouter } from 'next/router';
import { getLocalizedSlug } from '@/utils/getLocalizedSlug';

export default function LocalizedNav() {
  const router = useRouter();
  const { country, lang } = router.query;

  return (
    <nav>
      <ul>
        <li>
          <Link href={`/${country}/${lang}/${getLocalizedSlug(lang, 'about')}`}>
            About Us
          </Link>
        </li>
        <li>
          <Link href={`/${country}/${lang}/${getLocalizedSlug(lang, 'blogs')}`}>
            Blogs
          </Link>
        </li>
        <li>
          <Link href={`/${country}/${lang}/${getLocalizedSlug(lang, 'contact')}`}>
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}
