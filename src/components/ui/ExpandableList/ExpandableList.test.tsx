import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ExpandableList } from '../ExpandableList';

describe('ExpandableList', () => {
  const mockItems = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
  ];
  const renderItem = (item: string) => <div>{item}</div>;
  const getItemKey = (item: string) => item;

  it('renders nothing when items array is empty', () => {
    const { container } = render(
      <ExpandableList
        items={[]}
        renderItem={renderItem}
        getItemKey={getItemKey}
        limit={5}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders all items when items length is less than limit', () => {
    render(
      <ExpandableList
        items={mockItems.slice(0, 3)}
        renderItem={renderItem}
        getItemKey={getItemKey}
        limit={5}
      />,
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
    expect(screen.queryByText('more')).not.toBeInTheDocument();
  });

  it('renders limited items with "more" button when items exceed limit', () => {
    render(
      <ExpandableList
        items={mockItems}
        renderItem={renderItem}
        getItemKey={getItemKey}
        limit={4}
      />,
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 4')).toBeInTheDocument();
    expect(screen.queryByText('Item 5')).not.toBeInTheDocument();
    expect(screen.getByText('+2 more')).toBeInTheDocument();
  });

  it('expands to show all items when clicking "more" button', () => {
    render(
      <ExpandableList
        items={mockItems}
        renderItem={renderItem}
        getItemKey={getItemKey}
        limit={4}
      />,
    );

    fireEvent.click(screen.getByText('+2 more'));

    expect(screen.getByText('Item 5')).toBeInTheDocument();
    expect(screen.getByText('Item 6')).toBeInTheDocument();
    expect(screen.queryByText('more')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <ExpandableList
        items={mockItems}
        renderItem={renderItem}
        getItemKey={getItemKey}
        limit={5}
        className="custom-class"
      />,
    );

    expect(screen.getByTestId('expandable-list')).toHaveClass('custom-class');
  });
});
