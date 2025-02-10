import * as React from 'react';

import { Button } from '../Button';

interface IProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  limit?: number;
  getItemKey?: (item: T) => string | number;
  className?: string;
}

export const ExpandableList = <T,>({
  items,
  renderItem,
  limit = 5,
  getItemKey,
  className,
}: IProps<T>) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (!items?.length) return null;

  const visibleItems = isExpanded ? items : items.slice(0, limit);
  const remainingCount = items.length - limit;
  const showButton = remainingCount > 0 && !isExpanded;

  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`}
      data-testid="expandable-list"
    >
      {visibleItems.map((item, index) => (
        <div key={getItemKey?.(item) ?? index}>{renderItem(item)}</div>
      ))}

      {showButton && (
        <Button onClick={() => setIsExpanded(true)}>
          +{remainingCount} more
        </Button>
      )}
    </div>
  );
};
