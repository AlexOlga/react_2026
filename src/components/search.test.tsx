import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { vi } from 'vitest';
import Search from './search';
import { TEXTS } from '../shared/text';

describe('Search component', () => {
  test('renders input and button', () => {
    render(<Search newSearch={vi.fn()} searchQuery="" />);
    expect(
      screen.getByPlaceholderText(TEXTS.search.placeholder)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: TEXTS.search.button,
      })
    ).toBeInTheDocument();
  });

  test('renders initial  value', () => {
    render(<Search newSearch={vi.fn()} searchQuery="test" />);
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });

  test('updates input value', () => {
    render(<Search newSearch={vi.fn()} searchQuery="" />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });
    expect(input).toHaveValue('test');
  });

  test('calls newSearch when button clicked', () => {
    const mockNewSearch = vi.fn();
    render(<Search newSearch={mockNewSearch} searchQuery="" />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {
      target: {
        value: 'test',
      },
    });
    fireEvent.click(
      screen.getByRole('button', {
        name: TEXTS.search.button,
      })
    );
    expect(mockNewSearch).toHaveBeenCalledTimes(1);
    expect(mockNewSearch).toHaveBeenCalledWith('test');
  });
});
