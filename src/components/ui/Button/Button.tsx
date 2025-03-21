import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import { Loader } from '../Loader';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<IProps> = ({
  children,
  className = '',
  loading = false,
  disabled = false,
  ...props
}) => (
  <button
    type="button"
    className={twMerge(
      `
        flex items-center justify-center gap-2
        rounded-[20px]
        border
        border-[#7B4720]
        bg-[#BCD1F7]
        py-2
        px-2.5
        text-sm font-light leading-4 text-center
        hover:cursor-pointer
        hover:opacity-80
        disabled:opacity-70 disabled:cursor-not-allowed
      `,
      className,
    )}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? <Loader /> : children}
  </button>
);
