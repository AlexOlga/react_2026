import { describe, expect, test, vi } from 'vitest';
import Flyout from './Flyout';
import { fireEvent, render, screen } from '@testing-library/react';

vi.mock('../../utils/getPokemons', () => ({
  getPokemonsData: vi.fn(),
}));

vi.mock('../../utils/createCSVContext', () => ({
  createCSVContext: vi.fn(),
}));

vi.mock('../../utils/downloadData', () => ({
  downloadData: vi.fn(),
}));

import { useFavorites } from '../../store/storeFavorites';

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
});
