import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import { aboutPage, cardDetailsText, NotFoundPage } from './shared/text';
import App from './App';
import useLocalStorage from './hooks/useLocalStorage';
import {
  mockPokemon,
  mockPokemonData,
  mockPokemonList,
} from './__mocks__/mocks';
import userEvent from '@testing-library/user-event';
import { usePokemons } from './hooks/usePokemons';
import { useSearchPokemon } from './hooks/useSearchPokemon';

import type { Pokemon } from './types/pokemon';
import type { ApiResponse } from './types/api';
import { usePokemonDetails } from './hooks/usePokemonDetails';
import type { UseQueryResult } from '@tanstack/react-query';

vi.mock('./hooks/useLocalStorage', () => {
  return {
    default: vi.fn(),
  };
});

vi.mock('./hooks/usePokemons', () => ({
  usePokemons: vi.fn(),
}));

vi.mock('./hooks/useSearchPokemon', () => ({
  useSearchPokemon: vi.fn(),
}));
vi.mock('./hooks/usePokemonDetails', () => ({
  usePokemonDetails: vi.fn(),
}));
const mockedUsePokemons = vi.mocked(usePokemons);
const mockedUseSearchPokemon = vi.mocked(useSearchPokemon);
const mockedUsePokemonDetails = vi.mocked(usePokemonDetails);

describe('AppRoutes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('renders Home page on "/" route', async () => {
    vi.mocked(useLocalStorage).mockReturnValue(['', vi.fn()]);
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
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText('pikachu')).toBeInTheDocument();
  });

  test('renders About page on "/about" route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(aboutPage.title)).toBeInTheDocument();
  });

  test('renders NotFound page on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(NotFoundPage.text)).toBeInTheDocument();
  });

  test('renders CardDetails on nested details', async () => {
    vi.mocked(useLocalStorage).mockReturnValue(['', vi.fn()]);
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
    mockedUsePokemonDetails.mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<Pokemon, Error>);
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const cart1 = await screen.findByText('pikachu');
    expect(cart1).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(cart1);
    expect(await screen.findByText(cardDetailsText.height)).toBeInTheDocument();
    expect(await screen.findByText('electric')).toBeInTheDocument();
  });
  test('change CardDetails on nested details', async () => {
    vi.mocked(useLocalStorage).mockReturnValue(['', vi.fn()]);
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
    mockedUsePokemonDetails.mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<Pokemon, Error>);
    mockedUsePokemonDetails.mockImplementation((id) => {
      if (id === '1') {
        return {
          data: mockPokemon,
          isLoading: false,
          error: null,
        } as unknown as UseQueryResult<Pokemon, Error>;
      }

      return {
        data: mockPokemonList[1],
        isLoading: false,
        error: null,
      } as unknown as UseQueryResult<Pokemon, Error>;
    });
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const pikachu = await screen.findByText('pikachu');
    await user.click(pikachu);
    expect(await screen.findByText('electric')).toBeInTheDocument();
    expect(screen.queryByText('ground')).not.toBeInTheDocument();
    const clefairy = await screen.findByText('clefairy');
    await user.click(clefairy);
    expect(await screen.findByText('ground')).toBeInTheDocument();
    expect(screen.queryByText('electric')).not.toBeInTheDocument();
  });
});
