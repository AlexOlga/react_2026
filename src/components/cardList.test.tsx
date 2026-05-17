import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import CardList from './cardList';
import { mockPokemonList, mockPokemonListEmpty } from '../__mocks__/mocks';
import { MemoryRouter } from 'react-router';

describe('CardList component', () => {
  test('renders correct number of items', () => {
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <CardList list={mockPokemonList} />
      </MemoryRouter>
    );

    const list = screen.getAllByRole('listitem');
    expect(list).toHaveLength(mockPokemonList.length);
  });
  test('renders pokemonList', () => {
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <CardList list={mockPokemonList} />
      </MemoryRouter>
    );
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('clefairy')).toBeInTheDocument();
  });
  test('renders NotFound when list is empty', () => {
    render(
      <MemoryRouter>
        <CardList list={mockPokemonListEmpty} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
