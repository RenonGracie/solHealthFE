import * as React from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
  className?: string;
  childrenPosition?: 'top' | 'bottom' | 'left' | 'right';
  style?: React.CSSProperties;
}

export const Loader = ({
  className,
  children,
  childrenPosition = 'bottom',
  style,
}: React.PropsWithChildren<IProps>) => {
  const childrenClassNames = {
    top: 'flex-col-reverse',
    bottom: 'flex-col',
    left: 'flex-row-reverse',
    right: 'flex-row',
  };

  const effectivePosition = children ? childrenPosition : null;

  return (
    <div
      style={style}
      className={twMerge(
        'flex h-full w-full items-center justify-center',
        effectivePosition
          ? `${childrenClassNames[effectivePosition]} gap-4`
          : '',
        className,
      )}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-gray-900" />
      {children}
    </div>
  );
};
