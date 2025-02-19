import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Test Title',
    description: 'Test Description',
    onClose: vi.fn(),
    onConfirm: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('renders modal with correct title and description', async () => {
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  it('calls onClose when Cancel button is clicked', async () => {
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onConfirm when Confirm button is clicked', async () => {
    render(<Modal {...defaultProps} />);

    await waitFor(() => {
      const confirmButton = screen.getByText('Confirm');
      fireEvent.click(confirmButton);
      expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    });
  });
});
