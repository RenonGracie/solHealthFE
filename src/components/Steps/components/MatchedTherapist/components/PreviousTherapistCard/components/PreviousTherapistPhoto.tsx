import profileImagePlaceholderSrc from '@/assets/images/profile-image-placeholder.svg?url';
import { ImageWithPlaceholder } from '@/components/ui';

export interface IPreviousTherapistPhotoProps {
  photoSrc?: string;
}

export const PreviousTherapistPhoto = ({
  photoSrc,
}: IPreviousTherapistPhotoProps) => {
  return (
    <ImageWithPlaceholder
      src={photoSrc}
      placeholderSrc={profileImagePlaceholderSrc}
      containerClassName="w-[130px] h-[130px] rounded-[8px]"
    />
  );
};
