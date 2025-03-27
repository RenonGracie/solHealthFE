import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui';

interface IProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  className?: string;
}

export const BookButton = ({
  onClick,
  disabled,
  loading,
  className,
}: IProps) => {
  return (
    <Button
      withArrow
      loading={loading}
      onClick={onClick}
      disabled={disabled}
      className={twMerge('w-full h-12 mt-6 rounded-4xl', className)}
    >
      Book 45-Minute Session
    </Button>
  );
};
