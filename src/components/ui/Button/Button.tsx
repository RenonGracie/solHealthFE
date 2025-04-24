import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import ArrowRightIcon from '@/assets/icons/arrow-right-icon.svg';
import { Loader } from '../Loader';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  withArrow?: boolean;
}

export const Button: React.FC<IProps> = ({
  children,
  className = '',
  loading = false,
  disabled = false,
  withArrow = false,
  ...props
}) => (
  <button
    type="button"
    className={twMerge(
      `
        flex items-center justify-center gap-2
        rounded-[20px]
        border
        border-[var(--brand-brown)]
        bg-[var(--brand-blue)]
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
    {loading ? (
      <Loader />
    ) : (
      <>
        {children}
        {withArrow && <ArrowRightIcon />}
      </>
    )}
  </button>
);
