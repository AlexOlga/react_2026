import { NavLink } from 'react-router';
import AppRoutes from './routes/routes';
const App = () => {
  return (
    <>
      <header>
        {' '}
        <nav>
          <NavLink to="/" end>
            home
          </NavLink>
          <NavLink to="/about">about</NavLink>
        </nav>
      </header>
      <AppRoutes />
    </>
  );
};

export default App;
