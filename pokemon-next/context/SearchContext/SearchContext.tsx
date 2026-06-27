'use client';
import { createContext, type ReactNode } from 'react';
import { LOCAL_QUERY } from '../../constants/global';
import useLocalStorage from '../../hooks/useLocalStorage';
type SearchContextType = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);
type SearchProviderProps = { children: ReactNode; initialSearchQuery?: string };

export const SearchProvider = ({
  children,
  initialSearchQuery = '',
}: SearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useLocalStorage(
    LOCAL_QUERY,
    initialSearchQuery,
  );
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
