import * as React from 'react';

import { Tag, ExpandableList } from '@/components/ui';

interface IProps {
  title: string;
  items?: string[];
  matchedItems?: string[];
}

export const TherapyStyleSection: React.FC<IProps> = ({
  title,
  items,
  matchedItems,
}) => {
  const sortedItems = React.useMemo(() => {
    if (!items?.length) return [];

    return [...items].sort((a, b) => {
      const isAMatched = matchedItems?.includes(a) ?? false;
      const isBMatched = matchedItems?.includes(b) ?? false;

      if (isAMatched && !isBMatched) return -1;
      if (!isAMatched && isBMatched) return 1;
      return 0;
    });
  }, [items, matchedItems]);

  if (!sortedItems.length) return null;

  return (
    <section className="flex flex-col gap-3">
      <p className="text-xl font-normal leading-6 very-vogue-text">{title}</p>
      <ExpandableList
        items={sortedItems}
        renderItem={(item) => (
          <Tag
            className={`${matchedItems?.includes(item) ? 'bg-[var(--brand-coffee)]' : ''}`}
          >
            {item}
          </Tag>
        )}
      />
    </section>
  );
};
