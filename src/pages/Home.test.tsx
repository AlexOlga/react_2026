import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import getPokemons from '../utils/getPokemons';
import getPokemonByName from '../utils/getPokemonByName';
import loadFromLocalStorage from '../utils/loadFromLocalStorage';
import saveFromLocalStorage from '../utils/saveFromLocalStorage';

vi.mock('./utils/getPokemons');
vi.mock('./utils/getPokemonByName');
vi.mock('./utils/loadFromLocalStorage');
vi.mock('./utils/saveFromLocalStorage');

const mockedGetPokemons = vi.mocked(getPokemons);
const mockedGetPokemonByName = vi.mocked(getPokemonByName);
const mockedLoadFromLocalStorage = vi.mocked(loadFromLocalStorage);
const mockedSaveFromLocalStorage = vi.mocked(saveFromLocalStorage);

vi.mock('./components/cardList', async () => {
  return await import('../__mocks__/cardList');
});
vi.mock('./components/search', async () => {
  return await import('../__mocks__/search');
});
vi.mock('./components/loading', async () => {
  return await import('../__mocks__/loading');
});
vi.mock('./components/errorAlert', async () => {
  return await import('../__mocks__/errorAlert');
});

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('Behavior-Focused Testing', () => {
    test('renders pokemon list after successful API request', async () => {
      mockedLoadFromLocalStorage.mockReturnValue('');
      mockedGetPokemons.mockResolvedValue([
        { name: 'pikachu' },
        { name: 'bulbasaur' },
      ] as never);

      render(<App />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(await screen.findByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByTestId('card-list')).toBeInTheDocument();
    });

    test('renders error message when API request fails', async () => {
      mockedLoadFromLocalStorage.mockReturnValue('');
      mockedGetPokemons.mockRejectedValue(new Error('API Error'));

      render(<App />);

      expect(await screen.findByText('API Error')).toBeInTheDocument();
    });

    test('searches pokemon by user input', async () => {
      const user = userEvent.setup();

      mockedLoadFromLocalStorage.mockReturnValue('');
      mockedGetPokemons.mockResolvedValue([]);

      mockedGetPokemonByName.mockResolvedValue([
        { name: 'charizard' },
      ] as never);

      render(<App />);

      const input = screen.getByLabelText('search-input');

      await user.type(input, 'charizard');

      await waitFor(() => {
        expect(mockedGetPokemonByName).toHaveBeenCalled();
      });

      expect(await screen.findByText('charizard')).toBeInTheDocument();
    });
  });
  describe('API mocking tests', () => {
    test('uses mocked getPokemons API call', async () => {
      mockedLoadFromLocalStorage.mockReturnValue('');
      mockedGetPokemons.mockResolvedValue([{ name: 'squirtle' }] as never);
      render(<App />);
      await screen.findByText('squirtle');
      expect(mockedGetPokemons).toHaveBeenCalledTimes(1);
    });

    test('API error response correctly', async () => {
      mockedLoadFromLocalStorage.mockReturnValue('');
      mockedGetPokemons.mockRejectedValue(new Error('Network failed'));
      render(<App />);
      expect(await screen.findByText('Network failed')).toBeInTheDocument();
    });
  });

  describe('localStorage functionality tests', () => {
    test('reads value from localStorage on mount', async () => {
      mockedLoadFromLocalStorage.mockReturnValue('pikachu');
      mockedGetPokemonByName.mockResolvedValue([{ name: 'pikachu' }] as never);

      render(<App />);

      expect(mockedLoadFromLocalStorage).toHaveBeenCalled();
      expect(await screen.findByText('pikachu')).toBeInTheDocument();
    });

    test('writes value to localStorage after search', async () => {
      const user = userEvent.setup();

      mockedLoadFromLocalStorage.mockReturnValue('');
      mockedGetPokemons.mockResolvedValue([] as never);

      mockedGetPokemonByName.mockResolvedValue([{ name: 'pikachu' }] as never);

      render(<App />);
      const input = screen.getByLabelText('search-input');
      await user.type(input, 'pikachu');
      await waitFor(() => {
        expect(mockedSaveFromLocalStorage).toHaveBeenCalled();
      });
    });
  });
});
