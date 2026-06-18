import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import App from './App';
import useLocalStorage from '../pokemon-next/hooks/useLocalStorage';
import {
  mockPokemon,
  mockPokemonData,
  mockPokemonList,
} from './__mocks__/mocks';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import getPokemonById from './utils/getPokemonById';
import getPokemons from './utils/getPokemons';

vi.mock('./utils/getPokemons');
vi.mock('./utils/getPokemonById');
vi.mock('./hooks/useLocalStorage', () => {
  return {
    default: vi.fn(),
  };
});

const mockedGetPokemons = vi.mocked(getPokemons);
const mockedGetPokemonById = vi.mocked(getPokemonById);

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
describe('caches ', () => {
  test('caches pokemon details', async () => {
    vi.mocked(useLocalStorage).mockReturnValue(['', vi.fn()]);
    vi.mocked(useLocalStorage).mockReturnValue(['', vi.fn()]);
    mockedGetPokemons.mockResolvedValue(mockPokemonData);
    mockedGetPokemonById.mockImplementation((id: string) => {
      if (id === '1') {
        return Promise.resolve(mockPokemon);
      }
      return Promise.resolve(mockPokemonList[1]);
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <QueryClientProvider client={createTestQueryClient()}>
          <App />
        </QueryClientProvider>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const pikachu = await screen.findByText('pikachu');
    await user.click(pikachu);
    expect(mockedGetPokemonById).toHaveBeenCalledTimes(1);
    await user.click(pikachu);
    expect(mockedGetPokemonById).toHaveBeenCalledTimes(1);
  });
});
