import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { addDays, format } from 'date-fns';

import { useTherapistContext } from '@/hooks/useTherapistContext';
import { CALENDAR_GROUP_DATE_FORMAT } from '@/constants';
import { groupByDay } from '../utils';
import { BookingSection } from '../BookingSection';
import { mockTherapistContext } from './utils';

vi.mock('@/hooks/useTherapistContext');

const mockOnDaySelect = vi.fn();

const generateTimeSlot = (daysFromNow: number, hour: number = 11): string => {
  const date = addDays(new Date(), daysFromNow);
  date.setHours(hour, 0, 0, 0);

  return date.toUTCString();
};

const mockAvailableSlots = [
  generateTimeSlot(2),
  generateTimeSlot(3),
  generateTimeSlot(4),
];

type TherapistContextType = ReturnType<typeof useTherapistContext>;

const mockedUseTherapistContext = useTherapistContext as unknown as {
  mockReturnValue: (value: TherapistContextType) => void;
};

describe('BookingSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls onDaySelect with the first available day using correct parsing', async () => {
    mockedUseTherapistContext.mockReturnValue(
      mockTherapistContext(mockOnDaySelect, mockAvailableSlots),
    );

    render(<BookingSection />);

    const slotMap = groupByDay('Asia/Tbilisi', mockAvailableSlots);

    const firstKey = Object.keys(slotMap)[0];

    await waitFor(() => {
      expect(mockOnDaySelect).toHaveBeenCalledTimes(1);
    });

    const calledDate = mockOnDaySelect.mock.calls[0][0] as Date;

    expect(calledDate).toBeInstanceOf(Date);
    expect(format(calledDate, CALENDAR_GROUP_DATE_FORMAT)).toBe(firstKey);
  });

  it('calls onDaySelect with the only available day', async () => {
    const singleSlot = [generateTimeSlot(2)];

    mockedUseTherapistContext.mockReturnValue(
      mockTherapistContext(mockOnDaySelect, singleSlot),
    );

    render(<BookingSection />);

    const slotMap = groupByDay('Asia/Tbilisi', singleSlot);

    const firstKey = Object.keys(slotMap)[0];

    await waitFor(() => {
      expect(mockOnDaySelect).toHaveBeenCalledTimes(1);

      const calledDate = mockOnDaySelect.mock.calls[0][0] as Date;

      expect(format(calledDate, CALENDAR_GROUP_DATE_FORMAT)).toBe(firstKey);
    });
  });

  it('does not call onDaySelect if there are no available days', () => {
    mockedUseTherapistContext.mockReturnValue(
      mockTherapistContext(mockOnDaySelect),
    );

    render(<BookingSection />);

    expect(mockOnDaySelect).not.toHaveBeenCalled();
  });
});
