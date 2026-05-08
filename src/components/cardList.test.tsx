import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';

import CardList from './cardList';
import type { Pokemon } from '../types/pokemon';


describe('CardList component', () => {
const mockPokemonList: Pokemon[] = [{
    id: 1,
    name: 'pikachu',
    url: 'https://example.com',
    sprites: {
      back_default: 'https://example.com/pikachu.png',
    },
    types: [
      {
        slot: 20,
        type: { name: 'electric', url: 'https://example-types.com/' },
      },
    ],
  },
  {
    id: 2,
    name: "clefairy",
    url: 'https://example.com',
    sprites: {
      back_default: 'https://example.com/clefairy.png',
    },
    types: [
      {
        slot: 20,
        type: { name: 'ground', url: 'https://example-types.com/' },
      },
    ],
  },
];
 test('renders correct number of items', () => {
        render(<CardList list={mockPokemonList} />);
        const list = screen.getAllByRole('listitem');
         expect(list).toHaveLength(mockPokemonList.length);
  
  });
   test('renders pokemonList', () => {
        render(<CardList list={mockPokemonList} />);
        expect(screen.getByText('pikachu')).toBeInTheDocument();
        expect(screen.getByText("clefairy")).toBeInTheDocument();  
  
  });
   test('renders NotFound when list is empty', () => {
     const mockPokemonListEmpty: Pokemon[] = [];  
      render(<CardList list={mockPokemonListEmpty} />);
      expect(screen.getByTestId('not-found')).toBeInTheDocument();
     
    });
});