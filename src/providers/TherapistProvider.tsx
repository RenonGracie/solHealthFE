import * as React from 'react';
import { BookAppointmentResponse } from '@/api/services';
import { TherapistContext } from '@/contexts/TherapistContext';
import {
  IBookingState,
  ICurrentTherapistState,
  TMatchedTherapistData,
} from '@/types/therapist.types';

interface IProps {
  therapists: TMatchedTherapistData[];
  onBookSession: (data: BookAppointmentResponse) => void;
  initialTherapist?: TMatchedTherapistData;
  clientResponseId: string | null;
  onShowBooking: () => void;
  bookingData: BookAppointmentResponse | null;
}

export const TherapistProvider: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  initialTherapist,
  therapists,
  onBookSession,
  clientResponseId,
  onShowBooking: onShowBookingProp,
  bookingData,
}) => {
  const [therapistState, setTherapistState] =
    React.useState<ICurrentTherapistState>({
      currentIndex: 0,
      currentTherapist: initialTherapist,
    });

  const [bookingState, setBookingState] = React.useState<IBookingState>({
    showSection: false,
    selectedSlot: undefined,
    selectedDay: undefined,
  });

  const [previousTherapistsList, setPreviousTherapistsList] = React.useState<
    TMatchedTherapistData[] | null
  >(null);

  const handleFindAnotherTherapist = React.useCallback(() => {
    if (!therapists.length) return;

    const nextIndex = therapistState.currentIndex + 1;

    const updatedCurrentIndex = nextIndex >= therapists.length ? 0 : nextIndex;
    const updatedCurrentTherapist = therapists[updatedCurrentIndex];

    const originalIndex = therapistState.currentIndex;

    const originalTherapist = therapists[originalIndex];

    const isPreviouslyViewed = !!previousTherapistsList?.find(
      (therapistData) =>
        therapistData.therapist.id === originalTherapist.therapist.id,
    );

    if (!isPreviouslyViewed) {
      setPreviousTherapistsList((prevState) => [
        ...(prevState || []),
        originalTherapist,
      ]);
    }

    setTherapistState({
      currentIndex: updatedCurrentIndex,
      currentTherapist: updatedCurrentTherapist,
    });

    setBookingState({
      showSection: false,
      selectedSlot: undefined,
      selectedDay: undefined,
    });
  }, [therapistState.currentIndex, therapists, previousTherapistsList]);

  const handleShowBooking = React.useCallback(() => {
    onShowBookingProp();
    setBookingState((prev) => ({ ...prev, showSection: true }));
  }, [onShowBookingProp]);

  const handleSlotSelect = React.useCallback((slot: string) => {
    setBookingState((prev) => ({ ...prev, selectedSlot: slot }));
  }, []);

  const handleDaySelect = React.useCallback((day: Date | undefined) => {
    setBookingState((prev) => ({ ...prev, selectedDay: day }));
  }, []);

  const handleViewPreviousTherapist = React.useCallback(
    (therapistId: string) => {
      const therapist = previousTherapistsList?.find(
        (therapistInfo) => therapistInfo.therapist.id === therapistId,
      );

      if (!therapist) return;

      setTherapistState((prev) => ({ ...prev, currentTherapist: therapist }));
    },
    [previousTherapistsList],
  );

  const value = {
    bookingData,
    bookingState,
    clientResponseId,
    previousTherapistsList,
    currentTherapist: therapistState.currentTherapist,
    onBookSession,
    onDaySelect: handleDaySelect,
    onSlotSelect: handleSlotSelect,
    onShowBooking: handleShowBooking,
    onFindAnotherTherapist: handleFindAnotherTherapist,
    onViewPreviousTherapist: handleViewPreviousTherapist,
  };

  return (
    <TherapistContext.Provider value={value}>
      {children}
    </TherapistContext.Provider>
  );
};
