import Nav from '../Nav';
import Search from '../Search';
import ThemeSwitcher from '../ThemeSwitcher';

const Header = () => {
  return (
    <header className="flex justify-between p-4 items-center mb-6 bg-red-400">
      <Nav />
      <Search />
      <ThemeSwitcher />
    </header>
  );
};
export default Header;
