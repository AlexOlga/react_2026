'use client';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { switcherStyles } from '@/shared/styles/switcher';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function removeLocale(pathname: string) {
    return pathname.replace(/^\/(en|ru)(\/|$)/, '/');
  }
  const cleanPath = removeLocale(pathname);
  const query = searchParams.toString();
  const newPath = query ? `${cleanPath}?${query}` : cleanPath;

  return (
    <div className={switcherStyles.button}>
     <Link
      href={newPath}
      locale={locale === 'en' ? 'ru' : 'en'}
    >
      {locale.toUpperCase()}
    </Link>
    </div>
  );
}

