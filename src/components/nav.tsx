import { navTexts } from '../shared/text';
import { navStyles } from '../shared/styles/nav';
import { NavLink, type NavLinkRenderProps } from 'react-router';

const Nav = () => {
  return (
    <nav className={navStyles.base}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive || location.pathname.startsWith('/details')
            ? navStyles.active
            : navStyles.inactive
        }
      >
        {navTexts.home}
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }: NavLinkRenderProps) =>
          isActive ? navStyles.active : navStyles.inactive
        }
      >
        {navTexts.about}
      </NavLink>
    </nav>
  );
};

export default Nav;
