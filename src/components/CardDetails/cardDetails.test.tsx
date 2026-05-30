import { describe, test, expect, vi } from 'vitest';
import { mockPokemon } from '../../__mocks__/mocks';
import CardDetails from './CardDetails';
import { render, screen } from '@testing-library/react';
import { usePokemonDetails } from '../../hooks/usePokemonDetails';
import userEvent from '@testing-library/user-event';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Pokemon } from '../../types/pokemon';
const { useParams, useSearchParams, useNavigate } =
  await import('react-router');
vi.mock('../../utils/getPokemonById');
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: vi.fn(),
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});
vi.mock('../../hooks/usePokemonDetails', () => ({
  usePokemonDetails: vi.fn(),
}));
const mockedUsePokemonDetails = vi.mocked(usePokemonDetails);
const navigate = vi.fn();
vi.mocked(useParams).mockReturnValue({ cardId: '1' });
vi.mocked(useSearchParams).mockReturnValue([
  new URLSearchParams('page=1'),
  vi.fn(),
]);
vi.mocked(useNavigate).mockReturnValue(navigate);

describe('CardDetails component', () => {
  test('renders pokemon details after successful fetch', async () => {
    mockedUsePokemonDetails.mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<Pokemon, Error>);

    render(<CardDetails />);

    expect(await screen.findByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('134')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
  });
  test('navigates back when close button is clicked', async () => {
    const user = userEvent.setup();
    mockedUsePokemonDetails.mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: null,
    } as unknown as UseQueryResult<Pokemon, Error>);
    render(<CardDetails />);
    const closeBtn = await screen.findByRole('button');
    await user.click(closeBtn);
    expect(navigate).toHaveBeenCalledWith('/?page=1');
  });
});
