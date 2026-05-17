import { createContext, type ReactNode } from 'react';
import { LOCAL_QUERY } from '../constants/global';
import useLocalStorage from '../hooks/useLocalStorage';
type SearchContextType = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);
type props = { children: ReactNode };

export const SearchProvider = ({ children }: props) => {
  /*const [searchQuery, setSearchQuery] = useState<string>(() => {
    return loadFromLocalStorage(LOCAL_QUERY) || '';
  });*/
  const [searchQuery, setSearchQuery] = useLocalStorage(LOCAL_QUERY, '');
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
