import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import Modal from './Modal';

describe('Modal', () => {
  beforeEach(() => {
    const portalRoot = document.createElement('div');
    portalRoot.id = 'modal-root';
    document.body.append(portalRoot);
  });
  test('opens modal', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Modal{' '}
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  test('close modal  on Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        Modal{' '}
      </Modal>
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  test('renders through portal', async () => {
    const portalRoot = document.getElementById('modal-root');
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        Portal Content
      </Modal>
    );

    await waitFor(() => {
      expect(portalRoot).toContainElement(screen.getByText('Portal Content'));
    });
  });
});
