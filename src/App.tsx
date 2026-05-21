import AppRoutes from './routes/routes';
import Header from './components/Header';
import { SearchProvider } from './context/SearchContext/SearchContext.tsx';
import ThemeProvider from './context/ThemeContext/ThemeProvider.tsx';

const App = () => {
  return (
    <>
      <SearchProvider>
        <ThemeProvider>
          <Header />
          <AppRoutes />
        </ThemeProvider>
      </SearchProvider>
    </>
  );
};

export default App;
