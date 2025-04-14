import ArrowLeftIcon from '@/assets/icons/arrow-left-icon.svg';

export const ARROW_LEFT_ICON_SIZE = 32;

interface IProps {
  onGoBackClick?: () => void;
}

export const BackButton = ({ onGoBackClick }: IProps) => {
  return (
    <button
      type="button"
      style={{ width: ARROW_LEFT_ICON_SIZE }}
      className="cursor-pointer hover:opacity-80 transition-opacity self-center p-0 border-0 bg-transparent"
      onClick={onGoBackClick}
    >
      <ArrowLeftIcon />
    </button>
  );
};
