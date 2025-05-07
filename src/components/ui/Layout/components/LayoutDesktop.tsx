import * as React from 'react';

import headerDesktop1ImageUrl from '@/assets/images/header-desktop-1.jpg';
import headerDesktop2ImageUrl from '@/assets/images/header-desktop-2.jpg';
import { ImageWithPlaceholder } from '../../ImageWithPlaceholder';
import { ARROW_LEFT_ICON_SIZE, BackButton } from './BackButton';
import { AppLogo } from './AppLogo';

const HEADER_DESKTOP_IMAGES = [headerDesktop1ImageUrl, headerDesktop2ImageUrl];

interface IProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  hideTitle?: boolean;
  hideHeaderImage?: boolean;
  onGoBack?: () => void;
  onGoBackClick: () => void;
}

export const LayoutDesktop = ({
  children,
  title,
  hideTitle,
  hideHeaderImage,
  onGoBack,
  onGoBackClick,
}: IProps) => {
  const [headerImageIndex] = React.useState(() =>
    Math.floor(Math.random() * HEADER_DESKTOP_IMAGES.length),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`relative w-full ${hideHeaderImage ? '' : 'mb-13'}`}>
        {!hideHeaderImage && (
          <div className="relative w-full h-45">
            <ImageWithPlaceholder
              src={HEADER_DESKTOP_IMAGES[headerImageIndex]}
              alt="Header"
              imageClassName="object-center transition-opacity duration-500"
              containerClassName="w-full h-full"
              hidePlaceholder
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-center very-vogue-text text-[28px] leading-[80%]">
                CHANGE CAN BE SUNSHINE
                <br /> IF YOU LET IT IN
              </h3>
            </div>
          </div>
        )}
        <div className="absolute top-8 left-8">
          <AppLogo />
        </div>
      </header>
      <main className="flex-1">
        <div
          className={`relative max-w-7xl h-full px-5 mx-auto ${hideHeaderImage ? 'py-[120px]' : ''}`}
        >
          <div
            className={`flex items-center w-full ${hideTitle ? '' : 'mb-8'}`}
          >
            {!!onGoBack && <BackButton onGoBackClick={onGoBackClick} />}
            <h2
              style={{
                paddingRight: onGoBack ? ARROW_LEFT_ICON_SIZE : 0,
              }}
              className={`text-center leading-[90%] text-5xl very-vogue-text w-full ${
                hideTitle ? 'hidden' : ''
              }`}
            >
              {title}
            </h2>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};
