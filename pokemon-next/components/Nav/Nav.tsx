'use client';
import { navStyles } from '../../shared/styles/nav';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const Nav = () => {
  const pathname = usePathname();
  const t = useTranslations('nav');
  return (
    <nav className={navStyles.base}>
      <Link
        href="/"
        className={
          pathname === '/' ||
          pathname === '/en' ||
          pathname === '/ru' ||
          pathname.startsWith('/details')
            ? navStyles.active
            : navStyles.inactive
        }
      >
        {t('home')}
      </Link>
      <Link
        href="/about"
        className={
          pathname === '/about' ? navStyles.active : navStyles.inactive
        }
      >
        {t('about')}
      </Link>
    </nav>
  );
};

export default Nav;
