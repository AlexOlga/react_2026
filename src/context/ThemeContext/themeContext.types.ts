import type { ReactNode } from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export type ThemeProviderProps = { children: ReactNode };
