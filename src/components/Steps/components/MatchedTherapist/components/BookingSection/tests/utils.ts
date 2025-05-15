import { vi, Mock } from 'vitest';

export const mockTherapistContext = (
  mockOnDaySelect: Mock,
  mockAvailableSlots: string[] = [],
) => {
  return {
    bookingState: {
      selectedDay: undefined,
      selectedSlot: undefined,
      showSection: false,
    },
    clientResponseId: 'test-id',
    currentTherapist: {
      therapist: {
        email: 'test@therapist.com',
        available_slots: mockAvailableSlots,
        intern_name: 'Test Therapist',
        id: 'test-id',
        age: '30',
        calendar_email: 'calendar@test.com',
        accepting_new_clients: true,
      },
      score: 1,
      matched_diagnoses_specialities: [],
    },
    bookingData: null,
    previousTherapistsList: [],
    utmUserId: 1,
    onFindAnotherTherapist: vi.fn(),
    onShowBooking: vi.fn(),
    onDaySelect: mockOnDaySelect,
    onSlotSelect: vi.fn(),
    onBookSession: vi.fn(),
    onUpdateTherapistTimeSlots: vi.fn(),
    onHideBooking: vi.fn(),
    onViewPreviousTherapist: vi.fn(),
    setIsSearchingAnotherTherapist: vi.fn(),
  };
};
