import * as React from 'react';

import { Modal } from '../Modal';
import { useTherapistContext, useIsMobile } from '@/hooks';
import { LayoutDesktop, LayoutMobile } from './components';

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
  const isMobile = useIsMobile();
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

  const LayoutComponent = React.useMemo(
    () => (isMobile ? LayoutMobile : LayoutDesktop),
    [isMobile],
  );

  return (
    <>
      <LayoutComponent
        title={title}
        hideTitle={hideTitle}
        hideHeaderImage={hideHeaderImage}
        onGoBack={onGoBack}
        onGoBackClick={handleGoBackClick}
      >
        {children}
      </LayoutComponent>
      <Modal
        title="Restart Sign Up?"
        description="Restarting the sign up process will erase all your current data and preferences. Do you want to continue?"
        confirmButtonTitle="Yes, Restart"
        isOpen={isGoBackModalOpen}
        onClose={handleCloseGoBackModal}
        onConfirm={handleConfirmGoBack}
        confirmButtonWithArrow
        dialogPanelClassName="max-w-[700px]"
        descriptionClassName="leading-[1.2]"
      />
    </>
  );
};
