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
      className="hover:cursor-pointer hover:opacity-80 appearance-none bg-transparent p-0 m-0 flex flex-col flex-shrink-0 items-center justify-center py-4 lg:py-5 rounded-[8px] border border-[#7B4720] w-[186px] lg:w-[346px]"
    >
      <PreviousTherapistPhoto photoSrc={photoSrc} />
      <h5 className="text-center text-[24px] very-vogue-text mt-3 lg:mt-4">
        {name}
      </h5>
      <p className="text-center text-base font-light tracking-[-0.02em] mt-2">
        Therapist-in-Training
      </p>
    </button>
  );
};
