import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';

import Card from './card';
import type { Pokemon } from '../types/pokemon';
import { placeholderURL } from '../constant/global';

describe('Card component', () => {
  const mockPokemon: Pokemon = {
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

  test('renders pokemon name', () => {
        render(<Card {...mockPokemon} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  test('renders pokemon type', () => {
    render(<Card {...mockPokemon} />);
    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  test('renders pokemon image', () => {
    render(<Card {...mockPokemon} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/pikachu.png');
    expect(image).toHaveAttribute('alt', 'pikachu');
  });

  test('renders placeholder image when image is missing', () => {
    const pokemonWithoutImage: Pokemon = {
      ...mockPokemon,
      sprites: { },
    };

    render(<Card {...pokemonWithoutImage} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', placeholderURL );
  });
});
