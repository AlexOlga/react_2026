import type { Pokemon } from '../types/pokemon';

export const mockPokemon: Pokemon = {
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
};
export const pokemonWithoutImage: Pokemon = {
  ...mockPokemon,
  sprites: {},
};
export const mockPokemonList: Pokemon[] = [
  {
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
    name: 'clefairy',
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
export const mockPokemonListEmpty: Pokemon[] = [];
export const mockErrorMessage = { message: 'test error' };