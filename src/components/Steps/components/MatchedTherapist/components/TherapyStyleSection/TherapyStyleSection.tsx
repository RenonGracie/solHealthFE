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
  if (!items?.length) return null;

  return (
    <section className="flex flex-col gap-3">
      <p className="text-xl font-normal leading-6 font-['Very_Vogue_Text']">
        {title}
      </p>
      <ExpandableList
        items={items}
        renderItem={(item) => (
          <Tag
            className={`${matchedItems?.includes(item) ? 'bg-[#E6CAAF]' : ''}`}
          >
            {item}
          </Tag>
        )}
        getItemKey={(item) => item}
      />
    </section>
  );
};
