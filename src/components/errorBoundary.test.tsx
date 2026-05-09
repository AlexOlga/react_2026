import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ErrorBoundary from './errorBoundary';
import { TEXTS } from '../shared/text';
import ProblemChild from '../__tests__/problemComponent';

const Problem = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Children content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Children content')).toBeInTheDocument();
  });
  test('renders fallback UI when child throws error', () => {
    render(
      <ErrorBoundary>
        <Problem />
      </ErrorBoundary>
    );
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: TEXTS.error.retry })
    ).toBeInTheDocument();
  });
  test('resets UI after try clicking  again', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    const crashButton = screen.getByRole('button', { name: 'Crash' });
    fireEvent.click(crashButton);
    expect(
      screen.queryByRole('button', { name: 'Crash' })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: TEXTS.error.retry })
    ).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: TEXTS.error.retry });
    fireEvent.click(retryButton);
    expect(screen.getByRole('button', { name: 'Crash' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: TEXTS.error.retry })
    ).not.toBeInTheDocument();
  });
});
