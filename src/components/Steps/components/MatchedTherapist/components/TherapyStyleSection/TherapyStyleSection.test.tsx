import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { TherapyStyleSection } from './TherapyStyleSection';

describe('TherapyStyleSection', () => {
  const mockProps = {
    title: 'Therapy Styles',
    items: ['CBT', 'DBT', 'Mindfulness', 'ACT'],
  };

  it('renders correctly with all props', () => {
    render(<TherapyStyleSection {...mockProps} />);

    expect(screen.getByText('Therapy Styles')).toBeDefined();

    mockProps.items.forEach((item) => {
      expect(screen.getByText(item)).toBeDefined();
    });
  });

  it('returns null when items array is empty', () => {
    const { container } = render(
      <TherapyStyleSection title="Therapy Styles" items={[]} />,
    );

    expect(container.innerHTML).toBe('');
  });
});
