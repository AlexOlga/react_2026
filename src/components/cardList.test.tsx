import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import CardList from './cardList';
import { mockPokemonList, mockPokemonListEmpty } from '../__mocks__/mocks';

describe('CardList component', () => {
  test('renders correct number of items', () => {
    render(<CardList list={mockPokemonList} />);
    const list = screen.getAllByRole('listitem');
    expect(list).toHaveLength(mockPokemonList.length);
  });
  test('renders pokemonList', () => {
    render(<CardList list={mockPokemonList} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('clefairy')).toBeInTheDocument();
  });
  test('renders NotFound when list is empty', () => {
    render(<CardList list={mockPokemonListEmpty} />);
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
