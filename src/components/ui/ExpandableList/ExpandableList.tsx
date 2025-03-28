import * as React from 'react';

import { Button } from '../Button';
import { calculateFittingItems } from './utils';

interface IProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getItemKey?: (item: T) => string | number;
  className?: string;
}

const ITEMS_GAP = 8;
const MORE_BUTTON_WIDTH = 92;

const ExpandableListComponent = <T,>({
  items = [],
  renderItem,
  getItemKey,
  className,
}: IProps<T>) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(items.length);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    setIsExpanded(false);
    setVisibleCount(items.length);
  }, [items]);

  const calculateVisibleItems = React.useCallback(() => {
    if (!containerRef.current || !items.length) {
      setVisibleCount(0);
      return;
    }

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;

    const itemsWithoutButtonMore = calculateFittingItems({
      containerWidth,
      itemElements: itemRefs.current,
      itemGap: ITEMS_GAP,
      initialWidth: 0,
    });

    if (itemsWithoutButtonMore >= items.length) {
      setVisibleCount(items.length);
      return;
    }

    const itemsWithButtonMore = calculateFittingItems({
      containerWidth,
      itemElements: itemRefs.current,
      itemGap: ITEMS_GAP,
      initialWidth: MORE_BUTTON_WIDTH + ITEMS_GAP,
    });

    setVisibleCount(itemsWithButtonMore);
  }, [items]);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(calculateVisibleItems);
    const mutationObserver = new MutationObserver(calculateVisibleItems);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      mutationObserver.observe(containerRef.current, {
        childList: true,
      });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [calculateVisibleItems]);

  if (!items?.length) return null;

  const visibleItems = isExpanded ? items : items.slice(0, visibleCount);
  const remainingCount = items.length - visibleCount;
  const showButton = remainingCount > 0 && !isExpanded;

  return (
    <div
      ref={containerRef}
      style={{ gap: ITEMS_GAP }}
      className={`flex flex-wrap ${className}`}
      data-testid="expandable-list"
    >
      {visibleItems.map(
        (item, index) =>
          !!item && (
            <div
              key={getItemKey?.(item) ?? index}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              {renderItem(item)}
            </div>
          ),
      )}

      {showButton && (
        <Button
          style={{ width: MORE_BUTTON_WIDTH }}
          onClick={() => setIsExpanded(true)}
        >
          +{remainingCount} more
        </Button>
      )}
    </div>
  );
};

export const ExpandableList = React.memo(ExpandableListComponent) as <T>(
  props: IProps<T>,
) => React.ReactElement;
