import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';

import ReactHookForm from './ReactHookForm';
import { useForms } from '../../store/store';

describe('ReactHookForm', () => {
  test('renders form', () => {
    render(<ReactHookForm onClose={vi.fn()} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();    
    expect(screen.getByLabelText(/terms/i));
    expect(screen.getByLabelText(/^password$/i));
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();

  });

  test('shows validation errors', async () => {
    const user = userEvent.setup();
    render(<ReactHookForm onClose={vi.fn()} />);
    await user.type(screen.getByLabelText(/name/i), 'ivan');
    expect(
      screen.getByText(/first letter must be uppercase/i)
    ).toBeInTheDocument();
    await user.type(screen.getByLabelText(/email/i), 'ivan');
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    await user.type(screen.getByLabelText(/age/i), '-2');
    expect(screen.getByText(/age cannot be negative/i)).toBeInTheDocument();
  });
  test('submits valid form', async () => {
    const user = userEvent.setup();

    render(<ReactHookForm onClose={vi.fn()} />);
    
  const submitButton = screen.getByRole('button', {
    name: /submit/i,
  });
    expect(submitButton).toBeDisabled();

    await user.type(screen.getByLabelText(/name/i), 'Ivan');
    await user.type(screen.getByLabelText(/email/i), 'ivan@test.com');
    await user.type(screen.getByLabelText(/age/i), '25');
    await user.click(screen.getByLabelText(/terms/i));
    await user.type(screen.getByLabelText(/^password$/i), 'Password123!');
    await user.type(screen.getByLabelText(/confirm password/i), 'Password123!');
    await user.selectOptions(screen.getByLabelText(/gender/i), 'Male');
    await user.type(screen.getByLabelText(/country/i), 'France');
    expect(submitButton).not.toBeDisabled();
    await user.click(submitButton); 
    expect(useForms.getState().users).toHaveLength(1);
  });

});
