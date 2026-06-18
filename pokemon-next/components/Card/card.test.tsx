import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import Card from './Card';
import { placeholderURL } from '../../constants/global';
import { mockPokemon, pokemonWithoutImage } from '../../../src/__mocks__/mocks';

describe('Card component', () => {
  test('renders pokemon name', () => {
    render(<Card {...mockPokemon} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  test('renders pokemon base experience', () => {
    render(<Card {...mockPokemon} />);
    expect(screen.getByText('134')).toBeInTheDocument();
  });

  test('renders pokemon image', () => {
    render(<Card {...mockPokemon} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/pikachu.png');
    expect(image).toHaveAttribute('alt', 'pikachu');
  });

  test('renders placeholder image when image is missing', () => {
    render(<Card {...pokemonWithoutImage} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', placeholderURL);
  });
});
