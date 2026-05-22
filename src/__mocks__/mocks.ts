import type { Pokemon } from '../types/pokemon';

export const mockPokemon: Pokemon = {
  id: 1,
  name: 'pikachu',
  url: 'https://example.com',
  base_experience: '134',
  weight: 60,
  height: 7,
  abilities: [],
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
    base_experience: '134',
    weight: 5,
    height: 7,
    abilities: [],
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
    base_experience: '1342',
    weight: 52,
    height: 72,
    abilities: [],
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
export const mockPokemonData = {
  count: 125,
  results: mockPokemonList,
};
