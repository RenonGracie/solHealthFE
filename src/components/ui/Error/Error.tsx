import * as React from 'react';

import { twMerge } from 'tailwind-merge';

interface IProps {
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  error?: string | null;
}

export const Error = ({
  title = 'An error occurred',
  className,
  style,
  error,
}: IProps) => {
  return (
    <div
      style={style}
      className={twMerge(
        'flex flex-col gap-1 h-full w-full items-center justify-center',
        className,
      )}
    >
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      {error && (
        <p className="text-xl text-center font-light text-gray-600">
          Reason: {error}
        </p>
      )}
    </div>
  );
};
