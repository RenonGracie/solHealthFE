import * as React from 'react';

import headerDesktopImageUrl from '@/assets/images/header-desktop.png';
import headerMobileImageUrl from '@/assets/images/header-mobile.png';
import LogoIcon from '@/assets/icons/logo-icon.svg';
import ArrowLeftIcon from '@/assets/icons/arrow-left-icon.svg';
import { useTherapistContext } from '@/hooks/useTherapistContext';

import { Modal } from '../Modal';

interface IProps {
  children: React.ReactNode;
  hideTitle: boolean;
  hideHeaderImage?: boolean;
  onGoBack?: () => void;
}

export const Layout = ({
  children,
  hideTitle,
  hideHeaderImage,
  onGoBack,
}: IProps) => {
  const [isGoBackModalOpen, setIsGoBackModalOpen] = React.useState(false);

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
    <div className="min-h-screen flex flex-col">
      <header
        className={`relative w-full ${hideHeaderImage ? '' : 'mb-8 lg:mb-13'}`}
      >
        {!hideHeaderImage && (
          <div className="w-full h-25 lg:h-45">
            <picture>
              <source
                srcSet={headerDesktopImageUrl}
                media="(min-width: 1024px)"
              />
              <img
                src={headerMobileImageUrl}
                alt="Header"
                className="w-full h-full object-cover object-center"
              />
            </picture>
          </div>
        )}
        <div className="absolute top-8 left-8 hidden lg:flex gap-2 items-center">
          <h3 className="text-[28px] font-medium font-['Comfortaa']">
            Sol Health
          </h3>
          <LogoIcon />
        </div>
      </header>
      <main className="flex-1 relative before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/background.png')] before:bg-cover before:bg-center before:opacity-10">
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
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h2 className="text-[22px] font-medium font-['Comfortaa']">
                    Sol Health
                  </h2>
                  <LogoIcon />
                </div>
                <h2
                  className={`text-center leading-[36px] text-[40px] font-normal font-['Very_Vogue_Text'] lg:hidden ${
                    hideTitle ? 'hidden' : ''
                  }`}
                >
                  We Found the <i>Best Therapist</i> for You
                </h2>
              </div>
              <h2
                className={`text-center leading-[43px] text-5xl font-normal font-['Very_Vogue_Text'] hidden lg:block ${
                  hideTitle ? 'lg:hidden' : ''
                }`}
              >
                We Found the <i>Best Therapist</i> for You
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
