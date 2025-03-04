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

  const handleFindAnotherTherapist = React.useCallback(() => {
    if (!therapists.length) return;

    const nextIndex = therapistState.currentIndex + 1;

    if (nextIndex >= therapists.length) {
      setTherapistState({
        currentIndex: 0,
        currentTherapist: therapists[0],
      });
    } else {
      setTherapistState({
        currentIndex: nextIndex,
        currentTherapist: therapists[nextIndex],
      });
    }

    setBookingState({
      showSection: false,
      selectedSlot: undefined,
      selectedDay: undefined,
    });
  }, [therapistState.currentIndex, therapists]);

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

  const value = {
    bookingData,
    bookingState,
    clientResponseId,
    currentTherapist: therapistState.currentTherapist,
    onBookSession,
    onDaySelect: handleDaySelect,
    onSlotSelect: handleSlotSelect,
    onShowBooking: handleShowBooking,
    onFindAnotherTherapist: handleFindAnotherTherapist,
  };

  return (
    <TherapistContext.Provider value={value}>
      {children}
    </TherapistContext.Provider>
  );
};
