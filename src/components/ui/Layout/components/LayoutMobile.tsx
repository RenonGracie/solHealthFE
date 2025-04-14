import * as React from 'react';

import headerMobile1ImageUrl from '@/assets/images/header-mobile-1.jpg';
import headerMobile2ImageUrl from '@/assets/images/header-mobile-2.jpg';
import headerMobile3ImageUrl from '@/assets/images/header-mobile-3.jpg';
import { ARROW_LEFT_ICON_SIZE, BackButton } from './BackButton';
import { AppLogo } from './AppLogo';

const HEADER_MOBILE_IMAGES = [
  headerMobile1ImageUrl,
  headerMobile2ImageUrl,
  headerMobile3ImageUrl,
];

interface IProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  hideTitle?: boolean;
  hideHeaderImage?: boolean;
  onGoBack?: () => void;
  onGoBackClick: () => void;
}

export const LayoutMobile = ({
  children,
  title,
  hideTitle,
  hideHeaderImage,
  onGoBack,
  onGoBackClick,
}: IProps) => {
  const [headerImageIndex] = React.useState(() =>
    Math.floor(Math.random() * HEADER_MOBILE_IMAGES.length),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`relative w-full ${hideHeaderImage ? '' : 'mb-8'}`}>
        {!hideHeaderImage && (
          <div className="relative w-full h-25">
            <img
              src={HEADER_MOBILE_IMAGES[headerImageIndex]}
              alt="Header"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-center very-vogue-text text-[16px] leading-[80%]">
                CHANGE CAN BE SUNSHINE
                <br /> IF YOU LET IT IN
              </h3>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">
        <div
          className={`relative max-w-7xl h-full px-5 ${hideHeaderImage ? 'py-10' : ''}`}
        >
          <div
            className={`flex flex-col items-center w-full ${hideTitle ? '' : 'mb-5'}`}
          >
            <div className="flex items-center w-full mb-6">
              {!!onGoBack && <BackButton onGoBackClick={onGoBackClick} />}
              <div
                style={{
                  paddingRight: onGoBack ? ARROW_LEFT_ICON_SIZE : 0,
                }}
                className="w-full"
              >
                <AppLogo />
              </div>
            </div>
            <h2
              className={`text-center leading-[90%] text-[40px] very-vogue-text ${
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
