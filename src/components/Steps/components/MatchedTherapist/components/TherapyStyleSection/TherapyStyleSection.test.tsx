import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { TherapyStyleSection } from './TherapyStyleSection';

describe('TherapyStyleSection', () => {
  const mockProps = {
    title: 'Therapy Styles',
    items: ['CBT', 'DBT', 'Mindfulness', 'ACT'],
    matchedItems: ['CBT', 'Mindfulness'],
  };

  it('renders correctly with all props', () => {
    render(<TherapyStyleSection {...mockProps} />);

    expect(screen.getByText('Therapy Styles')).toBeDefined();

    mockProps.items.forEach((item) => {
      expect(screen.getByText(item)).toBeDefined();
    });
  });

  it('sorts matched items first', () => {
    render(<TherapyStyleSection {...mockProps} />);

    const tags = screen.getAllByText(/CBT|DBT|Mindfulness|ACT/);

    expect(tags[0].textContent).toBe('CBT');
    expect(tags[1].textContent).toBe('Mindfulness');
  });

  it('applies background color to matched items', () => {
    render(<TherapyStyleSection {...mockProps} />);

    const cbtTag = screen.getByText('CBT');
    const dbtTag = screen.getByText('DBT');

    expect(cbtTag.className).includes('bg-[#E6CAAF]');
    expect(dbtTag.className).not.includes('bg-[#E6CAAF]');
  });

  it('returns null when items array is empty', () => {
    const { container } = render(
      <TherapyStyleSection
        title="Therapy Styles"
        items={[]}
        matchedItems={[]}
      />,
    );

    expect(container.innerHTML).toBe('');
  });
});
