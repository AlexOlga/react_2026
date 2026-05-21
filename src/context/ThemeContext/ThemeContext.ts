import { createContext } from 'react';
import type { ThemeContextValue } from './themeContext.types';

export const ThemeContext = createContext<ThemeContextValue | null>(null);
