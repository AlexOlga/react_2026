import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import { mockErrorMessage } from '../../../src/__mocks__/mocks';
import ErrorAlert from './ErrorAlert';

describe('ErrorAlert component', () => {
  test('renders pokemon name', () => {
    render(<ErrorAlert {...mockErrorMessage} />);
    expect(screen.getByText(mockErrorMessage.message)).toBeInTheDocument();
  });
});
