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

import { Calendar, Error } from '../../../ui';
import { useAppointmentsService } from '../../../../api/services';
import { CALENDAR_GROUP_DATE_FORMAT } from '../../../../constants';
import { TimeSlot, BookButton } from './components';
import { groupByDay } from './utils';

interface IProps {
  clientResponseId: string | null;
  availableSlots?: string[];
  therapistEmail?: string;
}

export const BookingSection = ({
  clientResponseId,
  availableSlots,
  therapistEmail,
}: IProps) => {
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<
    Date | undefined
  >();

  const {
    bookAppointment: { error, loading, makeRequest: bookAppointment },
  } = useAppointmentsService();

  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);
  const twoWeeksFromTomorrow = addWeeks(tomorrow, 2);
  const oneMonthFromTomorrow = addMonths(tomorrow, 1);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const availableSlotsByDay = groupByDay(timezone, availableSlots);

  const handleChangeDay = (date?: Date) => {
    setSelectedTimeSlot(undefined);
    setSelectedDay(date);
  };

  const isDateDisabled = (date: Date) => {
    if (isBefore(date, tomorrow) || isAfter(date, twoWeeksFromTomorrow)) {
      return true;
    }

    const dayKey = format(date, CALENDAR_GROUP_DATE_FORMAT);

    return !availableSlotsByDay[dayKey];
  };

  const timeSlots = React.useMemo(() => {
    if (!selectedDay) {
      return null;
    }

    const formattedDay = format(selectedDay, CALENDAR_GROUP_DATE_FORMAT);

    return availableSlotsByDay[formattedDay].map((slot) => (
      <TimeSlot
        slot={slot}
        key={slot.toISOString()}
        onSelect={setSelectedTimeSlot}
        isSelected={!!selectedTimeSlot && isEqual(slot, selectedTimeSlot)}
      />
    ));
  }, [selectedDay, selectedTimeSlot, availableSlotsByDay]);

  const isBookSessionButtonDisabled =
    !selectedDay || !selectedTimeSlot || loading;

  const handleBookSession = () => {
    if (!clientResponseId || !selectedTimeSlot || !therapistEmail) {
      return;
    }

    void bookAppointment({
      data: {
        is_promo: true,
        status: 'Confirmed',
        reminder_type: 'Email',
        send_client_email_notification: true,
        client_response_id: clientResponseId,
        datetime: selectedTimeSlot.toISOString(),
        therapist_email: therapistEmail,
      },
    });
  };

  if (error) {
    return (
      <Error>
        <span>An error occurred while booking session</span>
      </Error>
    );
  }

  return (
    <section className="pb-10">
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
