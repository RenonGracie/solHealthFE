import { twMerge } from 'tailwind-merge';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const Error = ({ children, className }: IProps) => {
  return (
    <div
      className={twMerge(
        'flex h-full w-full items-center justify-center',
        className,
      )}
    >
      <div className="text-2xl font-bold text-center">{children}</div>
    </div>
  );
};
