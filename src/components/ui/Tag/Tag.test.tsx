import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Tag } from './Tag';

describe('Tag', () => {
  it('renders children correctly', () => {
    render(<Tag>Test Tag</Tag>);
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(<Tag>Test Tag</Tag>);
    const tag = screen.getByText('Test Tag');

    expect(tag).toHaveClass('px-[10px]');
    expect(tag).toHaveClass('py-[8px]');
    expect(tag).toHaveClass('rounded-[20px]');
    expect(tag).toHaveClass('border');
    expect(tag).toHaveClass('border-[#7B4720]');
  });

  it('applies additional className when provided', () => {
    render(<Tag className="test-class">Test Tag</Tag>);
    const tag = screen.getByText('Test Tag');

    expect(tag).toHaveClass('test-class');
    // Проверяем что дефолтные классы тоже присутствуют
    expect(tag).toHaveClass('px-[10px]');
    expect(tag).toHaveClass('border-[#7B4720]');
  });
});
