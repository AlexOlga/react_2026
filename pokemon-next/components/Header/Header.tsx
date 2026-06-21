import LocaleSwitcher from '../LocaleSwitcher/LocalSwitcher';
import Nav from '../Nav';
import ThemeSwitcher from '../ThemeSwitcher';
const Header = () => {
  return (
    <header className="flex justify-between p-4 items-center mb-6 bg-red-400">
      <Nav />  
      <div className='flex gap-x-4 justify-items-center'>    
      <ThemeSwitcher />
      <LocaleSwitcher/>
      </div>
    </header>
  );
};
export default Header;
