import { twMerge } from 'tailwind-merge';

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

export const Link = ({ className, ...props }: IProps) => {
  return (
    <a
      {...props}
      className={twMerge(
        'font-normal text-[16px] tracking-[-0.02em] underline hover:cursor-pointer hover:opacity-80',
        className,
      )}
    />
  );
};
