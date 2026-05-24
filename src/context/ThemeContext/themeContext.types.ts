import type { ReactNode } from 'react';

export const LIGHT = 'light';
export const DARK = 'dark';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export type ThemeProviderProps = { children: ReactNode };
