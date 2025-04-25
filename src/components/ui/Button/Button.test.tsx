import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Button } from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies default styles', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(
      `
        group
        flex items-center justify-center
        rounded-[20px]
        border
        border-[var(--brand-brown)]
        bg-[var(--brand-blue)]
        py-3
        px-6
        text-sm font-normal leading-4 text-center
        hover:cursor-pointer
        hover:opacity-80
        disabled:opacity-70 disabled:cursor-not-allowed
      `,
    );
  });

  it('merges custom className with default styles', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('rounded-[20px]');
  });

  it('forwards additional props to button element', () => {
    render(
      <Button disabled type="submit" data-testid="test-button">
        Click me
      </Button>,
    );
    const button = screen.getByTestId('test-button');

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders arrow icon when withArrow prop is true', () => {
    render(<Button withArrow>Click me</Button>);

    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });
});
