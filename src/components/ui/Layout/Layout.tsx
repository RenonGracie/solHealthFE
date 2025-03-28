import * as React from 'react';

import headerDesktop1ImageUrl from '@/assets/images/header-desktop-1.jpg';
import headerDesktop2ImageUrl from '@/assets/images/header-desktop-2.jpg';
import headerDesktop3ImageUrl from '@/assets/images/header-desktop-3.jpg';
import headerMobile1ImageUrl from '@/assets/images/header-mobile-1.jpg';
import headerMobile2ImageUrl from '@/assets/images/header-mobile-2.jpg';
import headerMobile3ImageUrl from '@/assets/images/header-mobile-3.jpg';
import LogoIcon from '@/assets/icons/logo-icon.svg';
import ArrowLeftIcon from '@/assets/icons/arrow-left-icon.svg';
import { useTherapistContext } from '@/hooks/useTherapistContext';

import { Modal } from '../Modal';

const HEADER_DESKTOP_IMAGES = [
  headerDesktop1ImageUrl,
  headerDesktop2ImageUrl,
  headerDesktop3ImageUrl,
];

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
}

const DEFAULT_TITLE = (
  <>
    We Found the <i>Best Therapist</i>&nbsp; for You
  </>
);

export const Layout = ({
  children,
  title = DEFAULT_TITLE,
  hideTitle,
  hideHeaderImage,
  onGoBack,
}: IProps) => {
  const [isGoBackModalOpen, setIsGoBackModalOpen] = React.useState(false);
  const [headerImageIndex] = React.useState(() =>
    Math.floor(Math.random() * HEADER_DESKTOP_IMAGES.length),
  );

  const { bookingState, onHideBooking } = useTherapistContext();

  const handleGoBackClick = React.useCallback(() => {
    if (bookingState.showSection) {
      onHideBooking();
    } else {
      setIsGoBackModalOpen(true);
    }
  }, [bookingState.showSection, onHideBooking]);

  const handleConfirmGoBack = () => {
    setIsGoBackModalOpen(false);
    onGoBack?.();
  };

  const handleCloseGoBackModal = () => {
    setIsGoBackModalOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col`}>
      <header
        className={`relative w-full ${hideHeaderImage ? '' : 'mb-8 lg:mb-13'}`}
      >
        {!hideHeaderImage && (
          <div className="relative w-full h-25 lg:h-45">
            <picture>
              <source
                srcSet={HEADER_DESKTOP_IMAGES[headerImageIndex]}
                media="(min-width: 1024px)"
              />
              <img
                src={HEADER_MOBILE_IMAGES[headerImageIndex]}
                alt="Header"
                className="w-full h-full object-cover object-center"
              />
            </picture>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-center font-['Very_Vogue_Text'] text-[16px] lg:text-[28px] leading-[80%]">
                CHANGE CAN BE SUNSHINE
                <br /> IF YOU LET IT IN
              </h3>
            </div>
          </div>
        )}
        <div className="absolute top-8 left-8 hidden lg:flex gap-2 items-center">
          <h3 className="text-[28px] font-medium font-['Comfortaa']">
            Sol Health
          </h3>
          <LogoIcon />
        </div>
      </header>
      <main className="flex-1">
        <div
          className={`relative max-w-7xl h-full px-5 lg:px-0 mx-auto ${hideHeaderImage ? 'py-10 lg:py-[120px]' : ''}`}
        >
          <div
            className={`${onGoBack ? 'grid grid-cols-[auto_1fr_auto]' : 'flex justify-center'} items-center w-full ${hideTitle ? '' : 'mb-5 lg:mb-8'}`}
          >
            {!!onGoBack && (
              <button
                type="button"
                className="cursor-pointer hover:opacity-80 transition-opacity self-start lg:self-center lg:mt-0 p-0 border-0 bg-transparent"
                onClick={handleGoBackClick}
              >
                <ArrowLeftIcon />
              </button>
            )}
            <div className={`${onGoBack ? 'pr-8' : ''}`}>
              <div className="lg:hidden">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <h2 className="text-[22px] font-medium font-['Comfortaa']">
                    Sol Health
                  </h2>
                  <LogoIcon />
                </div>
                <h2
                  className={`text-center leading-[90%] text-[40px] font-normal font-['Very_Vogue_Text'] lg:hidden ${
                    hideTitle ? 'hidden' : ''
                  }`}
                >
                  {title}
                </h2>
              </div>
              <h2
                className={`text-center leading-[90%] text-5xl font-normal font-['Very_Vogue_Text'] hidden lg:block ${
                  hideTitle ? 'lg:hidden' : ''
                }`}
              >
                {title}
              </h2>
            </div>
            {!!onGoBack && <div />}
          </div>
          {children}
        </div>
      </main>
      <Modal
        title="Are you sure?"
        description="Are you sure you want to restart the onboarding process? All your data will be lost."
        isOpen={isGoBackModalOpen}
        onClose={handleCloseGoBackModal}
        onConfirm={handleConfirmGoBack}
      />
    </div>
  );
};
