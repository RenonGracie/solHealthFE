import ArrowRightIcon from '@/assets/icons/arrow-right-icon.svg';
import {
  PreviousTherapistPhoto,
  IPreviousTherapistPhotoProps,
} from './components';

interface IProps extends IPreviousTherapistPhotoProps {
  onClick: () => void;
  name?: string;
}

export const PreviousTherapistCard = ({ photoSrc, name, onClick }: IProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        group
        hover:bg-[var(--brand-coffee)] hover:cursor-pointer
        appearance-none 
        bg-transparent 
        p-0 m-0 py-4 lg:py-5
        flex flex-col flex-shrink-0 items-center justify-center 
        rounded-[8px] 
        border border-[var(--brand-brown)] 
        w-[186px] lg:w-[346px]
        `}
    >
      <PreviousTherapistPhoto photoSrc={photoSrc} />
      <h5 className="flex items-center justify-center text-[24px] very-vogue-text ml-8 mt-3 lg:mt-4">
        {name}
        <ArrowRightIcon className="ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 ease-in-out" />
      </h5>
      <p className="text-center text-base font-light tracking-[-0.02em]">
        Therapist-in-Training
      </p>
    </button>
  );
};
