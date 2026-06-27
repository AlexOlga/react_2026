'use client';
import { navStyles } from '../../shared/styles/nav';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const Nav = () => {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const locale = useLocale();
  const localePrefix = `/${locale}`;
  const isHomeActive = (pathname: string) => {
    return (
      pathname === '/' ||
      pathname === localePrefix      
    );
  };
  return (
    <nav className={navStyles.base}>
      <Link
        href="/"
        className={
          isHomeActive(pathname) ? navStyles.active : navStyles.inactive
        }
      >
        {t('home')}
      </Link>
      <Link
        href="/about"
        className={
          pathname.includes('about') ? navStyles.active : navStyles.inactive
        }
      >
        {t('about')}
      </Link>
    </nav>
  );
};

export default Nav;
