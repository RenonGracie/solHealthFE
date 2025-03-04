import { twMerge } from 'tailwind-merge';

import { Button, Loader } from '@/components/ui';
import ArrowRightIcon from '@/assets/icons/arrow-right-icon.svg';

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
      onClick={onClick}
      disabled={disabled}
      className={twMerge('w-full h-12 mt-6 rounded-4xl', className)}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          Book Session <ArrowRightIcon />
        </>
      )}
    </Button>
  );
};
