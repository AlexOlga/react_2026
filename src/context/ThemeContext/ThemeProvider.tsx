import { useEffect, useMemo, useState } from 'react';
import {
  DARK,
  LIGHT,
  type Theme,
  type ThemeProviderProps,
} from './themeContext.types';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(LIGHT);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === DARK);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === LIGHT ? DARK : LIGHT));
  };
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
export default ThemeProvider;
