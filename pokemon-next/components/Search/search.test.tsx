import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Search from './Search';
import { TEXTS } from '../../shared/text';
import { MemoryRouter } from 'react-router';
import { SearchProvider } from '../../../src/context/SearchContext/SearchContext';
import { vi } from 'vitest';
import useLocalStorage from '../../hooks/useLocalStorage';
import userEvent from '@testing-library/user-event';

vi.mock('../../hooks/useLocalStorage', () => {
  return {
    default: vi.fn(),
  };
});

describe('Search component', () => {
  test('renders input and button', () => {
    vi.mocked(useLocalStorage).mockReturnValue(['', vi.fn()]);
    render(
      <MemoryRouter>
        <SearchProvider>
          <Search />
        </SearchProvider>
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText(TEXTS.search.placeholder)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: TEXTS.search.button,
      })
    ).toBeInTheDocument();
  });

  test('renders initial  value', () => {
    vi.mocked(useLocalStorage).mockReturnValue(['test', vi.fn()]);
    render(
      <MemoryRouter>
        <SearchProvider initialSearchQuery="test">
          <Search />
        </SearchProvider>
      </MemoryRouter>
    );
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  test('updates input value', () => {
    render(
      <MemoryRouter>
        <SearchProvider>
          <Search />
        </SearchProvider>
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });
    expect(input).toHaveValue('test');
  });

  test('saves search query to localStorage when button clicked', async () => {
    const setState = vi.fn();
    vi.mocked(useLocalStorage).mockReturnValue(['', setState]);
    render(
      <MemoryRouter>
        <SearchProvider>
          <Search />
        </SearchProvider>
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();
    await user.type(input, 'test');

    await user.click(
      screen.getByRole('button', {
        name: TEXTS.search.button,
      })
    );
    expect(setState).toHaveBeenCalledWith('test');
  });
});
