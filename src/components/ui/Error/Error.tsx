import { twMerge } from 'tailwind-merge';

interface IProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Error = ({ children, className, style }: IProps) => {
  return (
    <div
      style={style}
      className={twMerge(
        'flex h-full w-full items-center justify-center',
        className,
      )}
    >
      <div className="text-2xl font-bold text-center">{children}</div>
    </div>
  );
};
