import * as React from 'react';
import {
  addMinutes,
  addWeeks,
  addDays,
  addMonths,
  format,
  isBefore,
  isAfter,
  isEqual,
  startOfDay,
} from 'date-fns';

import { Calendar, Error, Modal } from '@/components/ui';
import { useAppointmentsService } from '@/api/services';
import { CALENDAR_GROUP_DATE_FORMAT } from '@/constants';
import { useFormattedTimeZone } from '@/hooks';
import { TimeSlot, BookButton } from './components';
import { groupByDay } from './utils';
import { useTherapistContext } from '@/hooks/useTherapistContext';
import { SessionInfo } from '../../../SessionInfo';

export const BookingSection = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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

  const { userTimeZone, formattedTimeZone } = useFormattedTimeZone();

  const {
    email: therapistEmail,
    available_slots: availableSlots,
    intern_name: therapistName,
  } = currentTherapist?.therapist || {};

  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);
  const twoWeeksFromTomorrow = addWeeks(tomorrow, 2);
  const oneMonthFromTomorrow = addMonths(tomorrow, 1);

  const availableSlotsByDay = groupByDay(userTimeZone, availableSlots);

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

  const sessionEndDateTime = React.useMemo(() => {
    if (!selectedSlot) return;

    return addMinutes(new Date(selectedSlot), 45).toISOString();
  }, [selectedSlot]);

  const isBookSessionButtonDisabled = !selectedDay || !selectedSlot || loading;

  const handleBookSession = () => {
    if (
      !clientResponseId ||
      !selectedSlot ||
      !therapistEmail ||
      !therapistName
    ) {
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
        therapist_name: therapistName,
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
      <Error
        className="lg:max-w-[344px]"
        title="An error occurred while booking session"
        error={error}
      />
    );
  }

  return (
    <section className="pb-10 lg:pb-0">
      <div className="flex flex-col gap-2 mb-5 lg:hidden">
        <h2 className="text-[40px] text-center very-vogue-text leading-[90%]">
          Book your <i>First</i> Session
        </h2>
        <p className="text-sm text-center font-light tracking-[-0.02em]">
          Local Timezone ({formattedTimeZone || userTimeZone})
        </p>
      </div>
      <div className="flex flex-col gap-5 rounded-[8px] border border-[var(--brand-brown)] w-full max-w-fit p-3 lg:px-6 lg:py-8 bg-transparent mx-auto lg:mx-0">
        <div className="flex-col gap-2 hidden lg:flex">
          <h2 className="text-[32px] text-center very-vogue-text">
            Book Your First Session
          </h2>
          <p className="text-sm text-center font-light tracking-[-0.02em]">
            Local Timezone ({formattedTimeZone || userTimeZone})
          </p>
        </div>
        <Calendar
          selected={selectedDay}
          onSelect={handleChangeDay}
          disabled={isDateDisabled}
          startMonth={today}
          endMonth={oneMonthFromTomorrow}
        />
        <div className="grid grid-cols-2 gap-2 pr-1 max-h-[142px] overflow-y-auto [&::-webkit-scrollbar]:w-[1px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--brand-brown)]">
          {timeSlots}
        </div>
        <BookButton
          onClick={() => setIsModalOpen(true)}
          disabled={isBookSessionButtonDisabled}
          className="hidden lg:flex"
        />
      </div>
      <BookButton
        onClick={() => setIsModalOpen(true)}
        disabled={isBookSessionButtonDisabled}
        className="lg:hidden"
      />
      <Modal
        title={
          <>
            Confirm <i>your</i>&nbsp; Selection
          </>
        }
        description="Do you want to book session with this therapist?"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBookSession}
        confirmButtonTitle="Book Session"
        confirmButtonWithArrow
        loading={loading}
      >
        <div className="rounded-[8px] border border-[var(--brand-brown)] p-4">
          <SessionInfo
            therapistName={currentTherapist?.therapist?.intern_name}
            therapistImageLink={currentTherapist?.therapist?.image_link}
            startDate={selectedSlot}
            endDate={sessionEndDateTime}
          />
        </div>
      </Modal>
    </section>
  );
};
