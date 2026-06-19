import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import useLocalStorage from '../../../pokemon-next/hooks/useLocalStorage';
import Home from './Home';
import { SearchProvider } from '../../context/SearchContext/SearchContext';
import { MemoryRouter } from 'react-router';
import { mockPokemon, mockPokemonData } from '../../__mocks__/mocks';
import { TEXTS } from '../../../pokemon-next/shared/text';
import ErrorBoundary from '../../../pokemon-next/app/components/ErrorBoundary';
import { usePokemons } from '../../../pokemon-next/hooks/usePokemons';
import { useSearchPokemon } from '../../../pokemon-next/hooks/useSearchPokemon';
import { type UseQueryResult } from '@tanstack/react-query';
import type { Pokemon } from '../../../pokemon-next/types/pokemon';
import type { ApiResponse } from '../../../pokemon-next/types/api';

vi.mock('../../hooks/usePokemons', () => ({
  usePokemons: vi.fn(),
}));

vi.mock('../../hooks/useSearchPokemon', () => ({
  useSearchPokemon: vi.fn(),
}));

vi.mock('../../hooks/useLocalStorage', () => ({
  default: vi.fn(),
}));

const mockedUsePokemons = vi.mocked(usePokemons);
const mockedUseSearchPokemon = vi.mocked(useSearchPokemon);
const mockedUseLocalStorage = vi.mocked(useLocalStorage);
describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('renders pokemon list', async () => {
    mockedUseLocalStorage.mockReturnValue(['', vi.fn()]);

    mockedUsePokemons.mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<ApiResponse<Pokemon>, Error>);

    mockedUseSearchPokemon.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<Pokemon[], Error>);

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
  test('renders loading', async () => {
    mockedUseLocalStorage.mockReturnValue(['', vi.fn()]);

    mockedUsePokemons.mockReturnValue({
      data: mockPokemonData,
      isLoading: true,
      error: null,
    } as unknown as UseQueryResult<ApiResponse<Pokemon>, Error>);

    mockedUseSearchPokemon.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<Pokemon[], Error>);

    render(
      <MemoryRouter>
        <SearchProvider>
          <Home />
        </SearchProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });
  test('renders error message', async () => {
    mockedUseLocalStorage.mockReturnValue(['', vi.fn()]);

    mockedUsePokemons.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('API Error'),
    } as unknown as UseQueryResult<ApiResponse<Pokemon>, Error>);

    mockedUseSearchPokemon.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<Pokemon[], Error>);

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
    vi.mocked(useLocalStorage).mockReturnValue(['pikachu', vi.fn()]);
    mockedUseSearchPokemon.mockReturnValue({
      data: [mockPokemon],
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<Pokemon[], Error>);

    mockedUsePokemons.mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<ApiResponse<Pokemon>, Error>);

    render(
      <MemoryRouter>
        <SearchProvider>
          <Home />
        </SearchProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('pikachu')).toBeInTheDocument();

    expect(mockedUseSearchPokemon).toHaveBeenCalledWith('pikachu');
  });
  test('renders ErrorBoundary after buggy action', async () => {
    const user = userEvent.setup();
    mockedUseLocalStorage.mockReturnValue(['', vi.fn()]);
    mockedUsePokemons.mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<ApiResponse<Pokemon>, Error>);

    mockedUseSearchPokemon.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<Pokemon[], Error>);

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

    await user.click(screen.getByRole('button', { name: TEXTS.buggy.button }));

    expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
  });
});
