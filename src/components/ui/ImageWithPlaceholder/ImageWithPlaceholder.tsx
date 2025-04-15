import * as React from 'react';
import { twMerge } from 'tailwind-merge';

interface IProps {
  src: string | undefined;
  placeholderSrc: string;
  alt?: string;
  containerClassName?: string;
  imageClassName?: string;
}

export const ImageWithPlaceholder = ({
  src,
  placeholderSrc,
  alt = 'image',
  containerClassName,
  imageClassName,
}: IProps) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  const shouldShowPlaceholder = !src || !loaded || error;

  const commonImageClassName = twMerge(
    'w-full h-full object-cover absolute inset-0',
    imageClassName,
  );

  return (
    <div className={twMerge('relative overflow-hidden', containerClassName)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={twMerge(
          commonImageClassName,
          shouldShowPlaceholder ? 'opacity-0' : 'opacity-100',
        )}
        data-testid="image-main"
      />
      <img
        src={placeholderSrc}
        alt={alt}
        className={twMerge(
          commonImageClassName,
          shouldShowPlaceholder ? 'opacity-100' : 'opacity-0',
        )}
        data-testid="image-placeholder"
      />
    </div>
  );
};
