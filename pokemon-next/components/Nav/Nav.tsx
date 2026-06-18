'use client';
import { navTexts } from '../../shared/text';
import { navStyles } from '../../shared/styles/nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { NavLink, useLocation, type NavLinkRenderProps } from 'react-router';

const Nav = () => {
  // const location = useLocation();
  const pathname = usePathname();

  return (
    <nav className={navStyles.base}>
      <Link
        href="/t"
        className={
          pathname === '/' || pathname.startsWith('/details')
            ? navStyles.active
            : navStyles.inactive
        }
      >
        {navTexts.home}
      </Link>
      <Link
        href="/about"
        className={
          pathname === '/about' ? navStyles.active : navStyles.inactive
        }
      >
        {navTexts.about}
      </Link>
    </nav>
  );
};

export default Nav;
