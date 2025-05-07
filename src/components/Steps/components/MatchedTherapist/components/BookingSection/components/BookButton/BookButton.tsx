import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui';

interface IProps {
  onClick: () => void;
  disabled: boolean;
  className?: string;
}

export const BookButton = ({ onClick, disabled, className }: IProps) => {
  return (
    <Button
      withArrow
      onClick={onClick}
      disabled={disabled}
      className={twMerge('w-full h-12 mt-6 lg:mt-5 rounded-4xl', className)}
    >
      Book 45-Minute Session
    </Button>
  );
};
