import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';

import Pagination from './Pagination';

describe('Pagination', () => {
  test('renders current and total pages', () => {
    render(
      <Pagination currentPage={2} totalPages={7} onPageChange={vi.fn()} />
    );
    expect(
      screen.getByText((content) => content.includes('7'))
    ).toBeInTheDocument();
    expect(screen.getByText(/page/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes('7'))
    ).toBeInTheDocument();
  });

  test('calls onPageChange with previous page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={2} totalPages={7} onPageChange={onPageChange} />
    );

    const prevButton = screen.getByRole('button', {
      name: '←',
    });

    await user.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test('calls onPageChange with next page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={2} totalPages={7} onPageChange={onPageChange} />
    );

    const nextButton = screen.getByRole('button', {
      name: '→',
    });

    await user.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('disables previous button on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={7} onPageChange={vi.fn()} />
    );

    const prevButton = screen.getByRole('button', {
      name: '←',
    });

    expect(prevButton).toBeDisabled();
  });

  test('disables next button on last page', () => {
    render(
      <Pagination currentPage={7} totalPages={7} onPageChange={vi.fn()} />
    );

    const nextButton = screen.getByRole('button', {
      name: '→',
    });

    expect(nextButton).toBeDisabled();
  });
});
