import * as React from 'react';
import { BookAppointmentResponse } from '@/api/services';
import { TMatchedTherapistData, IBookingState } from '@/types/therapist.types';

interface ITherapistContext {
  currentTherapist?: TMatchedTherapistData;
  bookingState: IBookingState;
  bookingData: BookAppointmentResponse | null;
  clientResponseId: string | null;
  onFindAnotherTherapist: () => void;
  onShowBooking: () => void;
  onBookSession: (data: BookAppointmentResponse) => void;
  onSlotSelect: (slot: string) => void;
  onDaySelect: (day: Date | undefined) => void;
}

export const TherapistContext = React.createContext<
  ITherapistContext | undefined
>(undefined);
