import LocaleSwitcher from '../LocalSwitcher';
import Nav from '../Nav';
import ThemeSwitcher from '../ThemeSwitcher';
const Header = () => {
  return (
    <header className="flex justify-between p-4 items-center mb-6 bg-red-400">
      <Nav />      
      <ThemeSwitcher />
      <LocaleSwitcher/>
    </header>
  );
};
export default Header;
