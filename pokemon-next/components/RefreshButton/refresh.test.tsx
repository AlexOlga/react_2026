import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RefreshButton from './RefreshButton';
import queryClient from '../../../src/client';
import { describe, expect, test, vi } from 'vitest';

vi.mock('../../client', () => ({
  default: {
    invalidateQueries: vi.fn(),
  },
}));
const invalidateMock = vi.mocked(queryClient.invalidateQueries);
describe('RefreshButton', () => {
  test('calls invalidateQueries on click', async () => {
    const user = userEvent.setup();
    render(<RefreshButton />);

    const button = screen.getByRole('button', {
      name: /refresh/i,
    });
    await user.click(button);
    expect(invalidateMock).toHaveBeenCalledWith({
      queryKey: ['pokemons'],
    });
    expect(invalidateMock).toHaveBeenCalledWith({
      queryKey: ['pokemon'],
    });
  });
});
