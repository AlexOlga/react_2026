import { createContext, useState, type ReactNode } from 'react';
import loadFromLocalStorage from '../utils/loadFromLocalStorage';
import { LOCAL_QUERY } from '../constants/global';
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
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return loadFromLocalStorage(LOCAL_QUERY) || '';
  });

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
