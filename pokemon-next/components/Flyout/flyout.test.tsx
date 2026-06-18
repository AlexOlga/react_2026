import { describe, expect, test, vi } from 'vitest';
import Flyout from './Flyout';
import { fireEvent, render, screen } from '@testing-library/react';
import { useFavorites } from '../../../src/store/storeFavorites';
import userEvent from '@testing-library/user-event';
import { downloadData } from '../../../src/utils/downloadData';
import { getPokemonsData } from '../../../src/utils/getPokemons';
import { createCSVContext } from '../../../src/utils/createCSVContext';
import { mockPokemon } from '../../../src/__mocks__/mocks';
vi.mock('../../utils/getPokemons', () => ({
  getPokemonsData: vi.fn(),
}));

vi.mock('../../utils/createCSVContext', () => ({
  createCSVContext: vi.fn(),
}));

vi.mock('../../utils/downloadData', () => ({
  downloadData: vi.fn(),
}));

const mockedDownloadData = vi.mocked(downloadData);
const mockedGetPokemonsData = vi.mocked(getPokemonsData);
const mockedCreateCSVContext = vi.mocked(createCSVContext);

describe('Flyout', () => {
  test('does not render when no favorites', () => {
    useFavorites.setState({
      totalFavorite: () => 0,
      removeAllFavorite: vi.fn(),
      favorites: [],
    });
    const { container } = render(<Flyout />);
    expect(container.firstChild).toBeNull();
  });
  test('renders correct number of selected items', () => {
    useFavorites.setState({
      totalFavorite: () => 3,
      removeAllFavorite: vi.fn(),
      favorites: [1, 2, 3],
    });
    render(<Flyout />);
    expect(screen.getByText('3 selected items')).toBeInTheDocument();
  });

  test('calls removeAllFavorite when Unselect all clicked', () => {
    const removeAllFavorite = vi.fn();

    useFavorites.setState({
      totalFavorite: () => 3,
      removeAllFavorite,
      favorites: [1, 2, 3],
    });

    render(<Flyout />);
    fireEvent.click(screen.getByRole('button', { name: /unselect all/i }));
    expect(removeAllFavorite).toHaveBeenCalledTimes(1);
  });

  test('downloads CSV file with favorites', async () => {
    const user = userEvent.setup();
    const removeAllFavorite = vi.fn();

    useFavorites.setState({
      totalFavorite: () => 3,
      removeAllFavorite,
      favorites: [1, 2, 3],
    });

    mockedGetPokemonsData.mockResolvedValue([mockPokemon]);
    mockedCreateCSVContext.mockReturnValue('csv-data');

    render(<Flyout />);

    const button = screen.getByRole('button', { name: /download/i });

    await user.click(button);

    expect(mockedGetPokemonsData).toHaveBeenCalled();
    expect(mockedCreateCSVContext).toHaveBeenCalled();
    expect(mockedDownloadData).toHaveBeenCalledWith(
      expect.any(Blob),
      '3_items.csv'
    );
  });
});
