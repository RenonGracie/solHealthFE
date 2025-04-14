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
        title="Are you sure?"
        description="Are you sure you want to restart the onboarding process? All your data will be lost."
        isOpen={isGoBackModalOpen}
        onClose={handleCloseGoBackModal}
        onConfirm={handleConfirmGoBack}
      />
    </>
  );
};
