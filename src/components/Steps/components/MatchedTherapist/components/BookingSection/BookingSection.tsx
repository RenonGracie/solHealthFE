import * as React from 'react';
import {
  addWeeks,
  addDays,
  addMonths,
  format,
  isBefore,
  isAfter,
  isEqual,
  startOfDay,
} from 'date-fns';

import { Calendar, Error } from '@/components/ui';
import { useAppointmentsService } from '@/api/services';
import { CALENDAR_GROUP_DATE_FORMAT } from '@/constants';
import { TimeSlot, BookButton } from './components';
import { groupByDay } from './utils';
import { useTherapistContext } from '@/hooks/useTherapistContext';

export const BookingSection = () => {
  const {
    bookingState: { selectedDay, selectedSlot },
    clientResponseId,
    currentTherapist,
    onDaySelect,
    onSlotSelect,
    onBookSession,
  } = useTherapistContext();

  const {
    bookAppointment: {
      data: bookingData,
      error,
      loading,
      makeRequest: bookAppointment,
    },
  } = useAppointmentsService();

  const { email: therapistEmail, available_slots: availableSlots } =
    currentTherapist?.therapist || {};

  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);
  const twoWeeksFromTomorrow = addWeeks(tomorrow, 2);
  const oneMonthFromTomorrow = addMonths(tomorrow, 1);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const availableSlotsByDay = groupByDay(timezone, availableSlots);

  const handleChangeDay = (date?: Date) => {
    onDaySelect(date);
  };

  const isDateDisabled = (date: Date) => {
    if (isBefore(date, tomorrow) || isAfter(date, twoWeeksFromTomorrow)) {
      return true;
    }

    const dayKey = format(date, CALENDAR_GROUP_DATE_FORMAT);

    return !availableSlotsByDay[dayKey];
  };

  const timeSlots = React.useMemo(() => {
    if (!selectedDay) return null;

    const formattedDay = format(selectedDay, CALENDAR_GROUP_DATE_FORMAT);

    return availableSlotsByDay[formattedDay].map((slot) => (
      <TimeSlot
        slot={slot}
        key={slot.toISOString()}
        onSelect={(date: Date) => onSlotSelect(date.toISOString())}
        isSelected={!!selectedSlot && isEqual(slot, new Date(selectedSlot))}
      />
    ));
  }, [selectedDay, selectedSlot, availableSlotsByDay, onSlotSelect]);

  const isBookSessionButtonDisabled = !selectedDay || !selectedSlot || loading;

  const handleBookSession = () => {
    if (!clientResponseId || !selectedSlot || !therapistEmail) {
      return;
    }

    void bookAppointment({
      data: {
        status: 'Confirmed',
        reminder_type: 'Email',
        send_client_email_notification: true,
        client_response_id: clientResponseId,
        datetime: selectedSlot,
        therapist_email: therapistEmail,
      },
    });
  };

  React.useEffect(() => {
    if (bookingData) {
      onBookSession(bookingData);
    }
  }, [bookingData, onBookSession]);

  if (error) {
    return (
      <Error>
        <span>An error occurred while booking session</span>
      </Error>
    );
  }

  return (
    <section className="pb-10 lg:pb-0">
      <div className="flex flex-col gap-2 mb-5 lg:hidden">
        <h2 className="text-[40px] text-center font-normal font-['Very_Vogue_Text'] ">
          Book your <i>First</i> Session
        </h2>
        <p className="text-sm text-center font-light tracking-[-0.02em]">
          Local Timezone ({timezone})
        </p>
      </div>
      <div className="flex flex-col gap-5 rounded-[8px] border border-[#7B4720] w-fit p-6 lg:py-8 bg-transparent mx-auto lg:mx-0">
        <div className="flex-col gap-2 hidden lg:flex">
          <h2 className="text-[32px] text-center font-normal font-['Very_Vogue_Text']">
            Book Your First Session
          </h2>
          <p className="text-sm text-center font-light tracking-[-0.02em]">
            Local Timezone ({timezone})
          </p>
        </div>
        <Calendar
          selected={selectedDay}
          onSelect={handleChangeDay}
          disabled={isDateDisabled}
          startMonth={today}
          endMonth={oneMonthFromTomorrow}
        />
        <div className="grid grid-cols-2 gap-2 pr-1 max-h-[142px] overflow-y-auto [&::-webkit-scrollbar]:w-[1px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#7B4720]">
          {timeSlots}
        </div>
        <BookButton
          onClick={handleBookSession}
          disabled={isBookSessionButtonDisabled}
          loading={loading}
          className="hidden lg:flex"
        />
      </div>
      <BookButton
        onClick={handleBookSession}
        disabled={isBookSessionButtonDisabled}
        loading={loading}
        className="lg:hidden"
      />
    </section>
  );
};
