import * as React from 'react';

import headerDesktopImageUrl from '@/assets/images/header-desktop.png';
import headerMobileImageUrl from '@/assets/images/header-mobile.png';
import LogoIcon from '@/assets/icons/logo-icon.svg';
import ArrowLeftIcon from '@/assets/icons/arrow-left-icon.svg';

import { Modal } from '../Modal';

interface IProps {
  children: React.ReactNode;
  onConfirmGoBack: () => void;
  unstyled?: boolean;
}

export const Layout = ({ children, onConfirmGoBack, unstyled }: IProps) => {
  const [isGoBackModalOpen, setIsGoBackModalOpen] = React.useState(false);

  const handleConfirmGoBack = () => {
    setIsGoBackModalOpen(false);
    onConfirmGoBack();
  };

  const handleCloseGoBackModal = () => {
    setIsGoBackModalOpen(false);
  };

  if (unstyled) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative w-full mb-8 lg:mb-13">
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
        <div className="absolute top-8 left-8 hidden lg:flex gap-2 items-center">
          <h3 className="text-[40px] font-normal font-['Very_Vogue_Text']">
            Sol Health
          </h3>
          <LogoIcon />
        </div>
      </header>
      <main className="flex-1 relative before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/background.png')] before:bg-cover before:bg-center before:opacity-10">
        <div className="relative max-w-7xl h-full px-3 mx-auto">
          <div className="grid grid-cols-[auto_1fr_auto] items-center w-full mb-5 lg:mb-8">
            <button
              type="button"
              className="cursor-pointer hover:opacity-80 transition-opacity self-start lg:self-center mt-[14px] lg:mt-0 p-0 border-0 bg-transparent"
              onClick={() => {
                setIsGoBackModalOpen(true);
              }}
            >
              <ArrowLeftIcon />
            </button>
            <div className="mr-8">
              <div className="lg:hidden">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h2 className="text-[40px] font-normal font-['Very_Vogue_Text']">
                    Sol Health
                  </h2>
                  <LogoIcon />
                </div>
                <h2 className="text-center text-[40px] font-normal font-['Very_Vogue_Text'] lg:hidden">
                  We Found the <i>Best Therapist</i> for You
                </h2>
              </div>
              <h2 className="text-center text-5xl font-normal font-['Very_Vogue_Text'] hidden lg:block">
                We Found the <i>Best Therapist</i> for You
              </h2>
            </div>
            <div />
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
