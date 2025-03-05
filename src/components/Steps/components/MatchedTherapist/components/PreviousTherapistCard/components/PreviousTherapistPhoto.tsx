import * as React from 'react';

import {
  VIEWED_THERAPIST_PHOTO_SHAPES,
  PLACEHOLDER_IMAGE_PATH,
} from '@/constants';

export interface IPreviousTherapistPhotoProps {
  photoSrc?: string;
}

export const PreviousTherapistPhoto = ({
  photoSrc,
}: IPreviousTherapistPhotoProps) => {
  const randomShape = React.useMemo(() => {
    const randomIndex = Math.floor(
      Math.random() * VIEWED_THERAPIST_PHOTO_SHAPES.length,
    );

    return `path('${VIEWED_THERAPIST_PHOTO_SHAPES[randomIndex]}')`;
  }, []);

  return (
    <div
      className="w-[130px] h-[130px]"
      style={{
        clipPath: randomShape,
      }}
    >
      <img
        className="w-full h-full object-cover"
        src={photoSrc || PLACEHOLDER_IMAGE_PATH}
      />
    </div>
  );
};
