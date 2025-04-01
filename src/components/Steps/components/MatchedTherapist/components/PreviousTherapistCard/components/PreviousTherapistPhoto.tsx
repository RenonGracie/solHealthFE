import { PLACEHOLDER_IMAGE_PATH } from '@/constants';

export interface IPreviousTherapistPhotoProps {
  photoSrc?: string;
}

export const PreviousTherapistPhoto = ({
  photoSrc,
}: IPreviousTherapistPhotoProps) => {
  return (
    <div className="w-[130px] h-[130px]">
      <img
        className="w-full h-full object-cover"
        src={photoSrc || PLACEHOLDER_IMAGE_PATH}
      />
    </div>
  );
};
