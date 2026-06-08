import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import Card from './Card';

const mockUser = {
  name: 'Ivan',
  age: 20,
  email: 'qw@qw.qw',
  gender: 'Mail',
  country: 'France',
  isNew: true,
};

describe('Card component', () => {
  test('renders card user', () => {
    render(<Card {...mockUser} />);
    expect(screen.getByText('Ivan')).toBeInTheDocument();
    expect(screen.getByText(/qw@qw.qw/)).toBeInTheDocument();
    expect(screen.getByText(/France/)).toBeInTheDocument();
     expect(screen.getByText(/20/)).toBeInTheDocument();
  });

  test('adds border for new card', () => {
    render(<Card {...mockUser} />);
     expect(
    screen.getByTestId('user-card'),
  ).toHaveClass('border-red-300');
  });


});