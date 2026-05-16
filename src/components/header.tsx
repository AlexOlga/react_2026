import Nav from './nav';
import Search from './search';

const Header = () => {
  return (
    <header className="flex justify-between p-4 items-center mb-6 bg-red-400">
      <Nav />
      <Search />
    </header>
  );
};
export default Header;
