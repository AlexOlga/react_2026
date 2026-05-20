import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { aboutPage, cardDetailsText, NotFoundPage } from './shared/text';
import App from './App';
import getPokemons from './utils/getPokemons';
import useLocalStorage from './hooks/useLocalStorage';
import {
  mockPokemon,
  mockPokemonData,
  mockPokemonList,
} from './__mocks__/mocks';
import getPokemonById from './utils/getPokemonById';
import userEvent from '@testing-library/user-event';

vi.mock('./utils/getPokemons');
vi.mock('./utils/getPokemonById');
vi.mock('./hooks/useLocalStorage', () => {
  return {
    default: vi.fn(),
  };
});

const mockedGetPokemons = vi.mocked(getPokemons);
const mockedGetPokemonById = vi.mocked(getPokemonById);

describe('AppRoutes', () => {
  test('renders Home page on "/" route', async () => {
    vi.mocked(useLocalStorage).mockReturnValue(['', vi.fn()]);
    mockedGetPokemons.mockResolvedValue(mockPokemonData);
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
    mockedGetPokemons.mockResolvedValue(mockPokemonData);
    mockedGetPokemonById.mockResolvedValue(mockPokemon);
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
    mockedGetPokemons.mockResolvedValue(mockPokemonData);
    mockedGetPokemonById.mockImplementation((id: string) => {
      if (id === '1') {
        return Promise.resolve(mockPokemon);
      }
      return Promise.resolve(mockPokemonList[1]);
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
