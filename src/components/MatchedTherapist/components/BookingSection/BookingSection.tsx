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

import { Calendar, Button } from '../../../ui';
import ArrowRightIcon from '../../../../assets/icons/arrow-right-icon.svg';
import { CALENDAR_GROUP_DATE_FORMAT } from '../../../../constants';
import { TimeSlot } from './components';
import { groupByDay } from './utils';

interface IProps {
  availableSlots?: string[];
}

export const BookingSection = ({ availableSlots }: IProps) => {
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<
    Date | undefined
  >();

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

  const isBookSessionButtonDisabled = !selectedDay || !selectedTimeSlot;

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
        <Button
          disabled={isBookSessionButtonDisabled}
          className="w-full h-12 rounded-4xl hidden lg:flex"
        >
          Book Session <ArrowRightIcon />
        </Button>
      </div>
      <Button
        disabled={isBookSessionButtonDisabled}
        className="w-full h-12 mt-6 rounded-4xl lg:hidden"
      >
        Book Session <ArrowRightIcon />
      </Button>
    </section>
  );
};
