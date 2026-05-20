import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import BuggyButton from './BuggyButton';
import { TEXTS } from '../../shared/text';

describe('BuggyButton component', () => {
  test('renders button', () => {
    render(<BuggyButton />);

    expect(
      screen.getByRole('button', {
        name: TEXTS.buggy.button,
      })
    ).toBeInTheDocument();
  });

  test('throws error after button click', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<BuggyButton />);

    const button = screen.getByRole('button');

    expect(() => {
      fireEvent.click(button);
    }).toThrow(TEXTS.buggy.error);

    consoleError.mockRestore();
  });
});
