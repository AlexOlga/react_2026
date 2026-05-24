import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import Header from './Header';
import { SearchProvider } from '../../context/SearchContext/SearchContext';
import ThemeProvider from '../../context/ThemeContext/ThemeProvider';

describe('Header', () => {
  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <SearchProvider>
          <ThemeProvider>
            <Header />
          </ThemeProvider>
        </SearchProvider>
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });

  test('render search input', () => {
    render(
      <MemoryRouter>
        <SearchProvider>
          <ThemeProvider>
            <Header />
          </ThemeProvider>
        </SearchProvider>
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
