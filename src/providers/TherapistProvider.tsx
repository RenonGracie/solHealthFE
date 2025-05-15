import * as React from 'react';

import { BookAppointmentResponse, SlotsResponse } from '@/api/services';
import { TherapistContext } from '@/contexts/TherapistContext';
import {
  IBookingState,
  ICurrentTherapistState,
  TMatchedTherapistData,
} from '@/types/therapist.types';

interface IProps {
  initialTherapistsList: TMatchedTherapistData[];
  onBookSession: (data: BookAppointmentResponse) => void;
  clientResponseId: string | null;
  onShowBooking: () => void;
  onHideBooking: () => void;
  bookingData: BookAppointmentResponse | null;
  setIsSearchingAnotherTherapist: (isFinding: boolean) => void;
  utmUserId: number | undefined;
}

const DEFAULT_BOOKING_STATE: IBookingState = {
  showSection: false,
  selectedSlot: undefined,
  selectedDay: undefined,
};

export const TherapistProvider: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  initialTherapistsList,
  onBookSession,
  clientResponseId,
  onShowBooking: onShowBookingProp,
  onHideBooking: onHideBookingProp,
  bookingData,
  setIsSearchingAnotherTherapist,
  utmUserId,
}) => {
  const [therapistState, setTherapistState] =
    React.useState<ICurrentTherapistState>({
      currentIndex: 0,
      currentTherapist: initialTherapistsList[0],
    });

  const [therapistsList, setTherapistsList] = React.useState<
    TMatchedTherapistData[]
  >(initialTherapistsList);

  const [bookingState, setBookingState] = React.useState<IBookingState>(
    DEFAULT_BOOKING_STATE,
  );

  const [previousTherapistsList, setPreviousTherapistsList] = React.useState<
    TMatchedTherapistData[] | null
  >(null);

  const handleFindAnotherTherapist = React.useCallback(() => {
    if (!therapistsList.length) return;

    const nextIndex = therapistState.currentIndex + 1;

    const updatedCurrentIndex =
      nextIndex >= therapistsList.length ? 0 : nextIndex;
    const updatedCurrentTherapist = therapistsList[updatedCurrentIndex];

    const originalIndex = therapistState.currentIndex;

    const originalTherapist = therapistsList[originalIndex];

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
  }, [therapistState.currentIndex, therapistsList, previousTherapistsList]);

  const handleShowBooking = React.useCallback(() => {
    onShowBookingProp();
    setBookingState((prev) => ({ ...prev, showSection: true }));
  }, [onShowBookingProp]);

  const handleHideBooking = React.useCallback(() => {
    onHideBookingProp();
    setBookingState(DEFAULT_BOOKING_STATE);
  }, [onHideBookingProp]);

  const handleSlotSelect = React.useCallback((slot: string) => {
    setBookingState((prev) => ({ ...prev, selectedSlot: slot }));
  }, []);

  const handleDaySelect = React.useCallback((day: Date | undefined) => {
    setBookingState((prev) => ({
      ...prev,
      selectedSlot: undefined,
      selectedDay: day,
    }));
  }, []);

  const handleViewPreviousTherapist = React.useCallback(
    (therapistId: string) => {
      const therapist = previousTherapistsList?.find(
        (therapistInfo) => therapistInfo.therapist.id === therapistId,
      );

      if (!therapist) return;

      const { currentTherapist } = therapistState;

      if (currentTherapist) {
        const isCurrentTherapistInList = previousTherapistsList?.some(
          (therapistInfo) =>
            therapistInfo.therapist.id === currentTherapist.therapist.id,
        );

        if (!isCurrentTherapistInList) {
          setPreviousTherapistsList((prev) => [
            ...(prev || []),
            currentTherapist,
          ]);
        }
      }

      setBookingState({
        showSection: false,
        selectedSlot: undefined,
        selectedDay: undefined,
      });

      setTherapistState((prev) => ({ ...prev, currentTherapist: therapist }));
    },
    [previousTherapistsList, therapistState],
  );

  const handleUpdateTherapistTimeSlots = React.useCallback(
    (
      therapistEmail: string,
      availableSlots: SlotsResponse['available_slots'],
    ) => {
      const updatedTherapistsList = therapistsList.map((therapistInfo) => {
        if (therapistInfo.therapist.email === therapistEmail) {
          return {
            ...therapistInfo,
            therapist: {
              ...therapistInfo.therapist,
              available_slots: availableSlots,
            },
          };
        }
        return therapistInfo;
      });

      setTherapistsList(updatedTherapistsList);

      setTherapistState((prev) => {
        if (!prev.currentTherapist) return prev;

        return {
          ...prev,
          currentTherapist: {
            ...prev.currentTherapist,
            therapist: {
              ...prev.currentTherapist.therapist,
              available_slots: availableSlots,
            },
          },
        };
      });

      setBookingState((prev) => ({
        ...prev,
        selectedSlot: undefined,
        selectedDay: undefined,
      }));
    },
    [therapistsList],
  );

  const value = {
    bookingData,
    bookingState,
    clientResponseId,
    previousTherapistsList,
    currentTherapist: therapistState.currentTherapist,
    utmUserId,
    onBookSession,
    onDaySelect: handleDaySelect,
    setIsSearchingAnotherTherapist,
    onSlotSelect: handleSlotSelect,
    onShowBooking: handleShowBooking,
    onHideBooking: handleHideBooking,
    onFindAnotherTherapist: handleFindAnotherTherapist,
    onViewPreviousTherapist: handleViewPreviousTherapist,
    onUpdateTherapistTimeSlots: handleUpdateTherapistTimeSlots,
  };

  return (
    <TherapistContext.Provider value={value}>
      {children}
    </TherapistContext.Provider>
  );
};
