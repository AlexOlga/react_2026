import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import { mockErrorMessage } from '../__mocks__/mocks';
import ErrorAlert from './errorAlert';

describe('ErrorAlert component', () => {
  test('renders pokemon name', () => {
    render(<ErrorAlert {...mockErrorMessage} />);
    expect(screen.getByText(mockErrorMessage.message)).toBeInTheDocument();
  });
});
