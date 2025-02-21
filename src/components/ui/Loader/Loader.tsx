import { twMerge } from 'tailwind-merge';

interface IProps {
  className?: string;
}

export const Loader = ({ className }: IProps) => (
  <div
    className={twMerge(
      'flex h-full w-full items-center justify-center',
      className,
    )}
  >
    <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
  </div>
);
