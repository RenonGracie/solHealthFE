import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ExpandableList } from '../ExpandableList';

describe('ExpandableList', () => {
  const mockItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const renderItem = (item: string) => (
    <div style={{ width: '100px' }}>{item}</div>
  );

  const getItemKey = (item: string) => item;

  it('renders nothing when items array is empty', () => {
    const { container } = render(
      <ExpandableList
        items={[]}
        renderItem={renderItem}
        getItemKey={getItemKey}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders all items when they fit in container width', () => {
    render(
      <ExpandableList
        items={mockItems.slice(0, 3)}
        renderItem={renderItem}
        getItemKey={getItemKey}
      />,
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
    expect(screen.queryByText(/more/)).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <ExpandableList
        items={mockItems}
        renderItem={renderItem}
        getItemKey={getItemKey}
        className="custom-class"
      />,
    );

    expect(screen.getByTestId('expandable-list')).toHaveClass('custom-class');
  });
});
