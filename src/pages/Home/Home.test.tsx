import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import getPokemons from '../../utils/getPokemons';
import getPokemonByName from '../../utils/getPokemonByName';
import useLocalStorage from '../../hooks/useLocalStorage';
import Home from './Home';
import { SearchProvider } from '../../context/SearchContext/SearchContext';
import { MemoryRouter } from 'react-router';
import { mockPokemon, mockPokemonData } from '../../__mocks__/mocks';
import { TEXTS } from '../../shared/text';
import ErrorBoundary from '../../components/ErrorBoundary';

vi.mock('../../utils/getPokemons');
vi.mock('../../utils/getPokemonByName');
vi.mock('../../hooks/useLocalStorage', () => {
  return {
    default: vi.fn(),
  };
});

const mockedGetPokemons = vi.mocked(getPokemons);
const mockedGetPokemonByName = vi.mocked(getPokemonByName);

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('Behavior-Focused Testing', () => {
    test('renders pokemon list after successful API request', async () => {
      vi.mocked(useLocalStorage).mockReturnValue(['', vi.fn()]);
      mockedGetPokemons.mockResolvedValue(mockPokemonData);

      render(
        <MemoryRouter>
          <SearchProvider>
            <Home />
          </SearchProvider>
        </MemoryRouter>
      );

      expect(await screen.findByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('clefairy')).toBeInTheDocument();
    });

    test('renders error message when API request fails', async () => {
      mockedGetPokemons.mockRejectedValue(new Error('API Error'));
      render(
        <MemoryRouter>
          <SearchProvider>
            <Home />
          </SearchProvider>
        </MemoryRouter>
      );

      expect(await screen.findByText('API Error')).toBeInTheDocument();
    });
    test('loads and shows pokemon based on stored search query', async () => {
      mockedGetPokemonByName.mockResolvedValue([mockPokemon] as never);
      vi.mocked(useLocalStorage).mockReturnValue(['pikachu', vi.fn()]);

      render(
        <MemoryRouter>
          <SearchProvider>
            <Home />
          </SearchProvider>
        </MemoryRouter>
      );
      expect(mockedGetPokemonByName).toHaveBeenCalledWith('pikachu');

      expect(await screen.findByText('pikachu')).toBeInTheDocument();
    });
  });
  describe('API mocking tests', () => {
    test('uses mocked getPokemons API call', async () => {
      vi.mocked(useLocalStorage).mockReturnValue(['', vi.fn()]);
      mockedGetPokemons.mockResolvedValue(mockPokemonData);

      render(
        <MemoryRouter>
          <SearchProvider>
            <Home />
          </SearchProvider>
        </MemoryRouter>
      );

      expect(await screen.findByText('pikachu')).toBeInTheDocument();
      expect(mockedGetPokemons).toHaveBeenCalledTimes(1);
    });
  });

  describe('buggy button', () => {
    test('renders ErrorBoundary after buggy action in Home', async () => {
      vi.mocked(useLocalStorage).mockReturnValue(['', vi.fn()]);
      mockedGetPokemons.mockResolvedValue(mockPokemonData);
      const user = userEvent.setup();
      render(
        <ErrorBoundary>
          <MemoryRouter>
            <SearchProvider>
              <Home />
            </SearchProvider>
          </MemoryRouter>
        </ErrorBoundary>
      );

      expect(await screen.findByText('pikachu')).toBeInTheDocument();
      await user.click(
        screen.getByRole('button', { name: TEXTS.buggy.button })
      );
      expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
    });
  });
});
