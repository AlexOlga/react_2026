import AppRoutes from './routes/routes';
import Header from './components/Header';
import { SearchProvider } from './context/SearchContext.tsx';
const App = () => {
  return (
    <>
      <SearchProvider>
        <Header />
        <AppRoutes />
      </SearchProvider>
    </>
  );
};

export default App;
