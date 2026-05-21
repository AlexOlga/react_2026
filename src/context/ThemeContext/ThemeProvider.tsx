import { useEffect, useMemo, useState } from 'react';
import { Theme, type ThemeProviderProps } from './themeContext.types';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === Theme.DARK);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
export default ThemeProvider;
