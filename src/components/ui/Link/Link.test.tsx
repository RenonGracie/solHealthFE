import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Link } from './Link';

describe('Link', () => {
  it('renders with default styles', () => {
    render(<Link href="https://example.com">Test Link</Link>);

    const link = screen.getByRole('link');
    expect(link).toHaveClass(
      'font-normal',
      'text-[16px]',
      'tracking-[-0.02em]',
      'underline',
      'hover:cursor-pointer',
      'hover:opacity-80',
    );
  });

  it('merges custom className with default styles', () => {
    render(
      <Link href="https://example.com" className="text-red-500">
        Test Link
      </Link>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-red-500');
    expect(link).toHaveClass('underline');
  });

  it('passes through additional props', () => {
    render(
      <Link
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="External link"
      >
        Test Link
      </Link>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('aria-label', 'External link');
  });

  it('renders children correctly', () => {
    render(
      <Link href="https://example.com">
        <span>Child Element</span>
      </Link>,
    );

    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });
});
