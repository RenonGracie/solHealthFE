import * as React from 'react';
import { twMerge } from 'tailwind-merge';

type TBaseProps = {
  src: string | undefined;
  alt?: string;
  containerClassName?: string;
  imageClassName?: string;
};

type TWithPlaceholder = TBaseProps & {
  hidePlaceholder?: never;
  placeholderSrc: string;
};

type TWithoutPlaceholder = TBaseProps & {
  hidePlaceholder: true;
  placeholderSrc?: never;
};

type TProps = TWithPlaceholder | TWithoutPlaceholder;

export const ImageWithPlaceholder = ({
  src,
  placeholderSrc,
  alt = 'image',
  containerClassName,
  imageClassName,
  hidePlaceholder,
}: TProps) => {
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
      {!hidePlaceholder && (
        <img
          src={placeholderSrc}
          alt={alt}
          className={twMerge(
            commonImageClassName,
            shouldShowPlaceholder ? 'opacity-100' : 'opacity-0',
          )}
          data-testid="image-placeholder"
        />
      )}
    </div>
  );
};
