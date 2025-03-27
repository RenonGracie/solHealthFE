import * as React from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import CalendarIcon from '@/assets/icons/calendar-icon.svg';
import { PLACEHOLDER_IMAGE_PATH } from '@/constants';

interface IProps {
  therapistName?: string;
  startDate?: string;
  endDate?: string;
  therapistImageLink?: string;
}

export const SessionInfo = ({
  therapistName,
  therapistImageLink,
  startDate,
  endDate,
}: IProps) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const sessionDate = React.useMemo(() => {
    if (!startDate) return '';

    const zonedDate = toZonedTime(new Date(startDate), userTimeZone);

    return format(zonedDate, 'EEE, MMM dd');
  }, [startDate, userTimeZone]);

  const sessionTime = React.useMemo(() => {
    if (!startDate || !endDate) return '';

    const zonedStartDate = toZonedTime(new Date(startDate), userTimeZone);
    const zonedEndDate = toZonedTime(new Date(endDate), userTimeZone);

    const startTime = format(zonedStartDate, 'h:mmaaa');
    const endTime = format(zonedEndDate, 'h:mmaaa');

    return `${startTime} - ${endTime} ${userTimeZone}`;
  }, [startDate, endDate, userTimeZone]);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between gap-1">
      <div className="flex gap-4 items-center">
        <img
          src={therapistImageLink || PLACEHOLDER_IMAGE_PATH}
          alt={`${therapistName} photo`}
          className="w-[80px] h-[80px] rounded-full object-cover"
        />
        <div>
          <h2 className="text-[32px] font-normal font-['Very_Vogue_Text'] leading-[90%]">
            {therapistName}
          </h2>
          <p className="text-base font-light leading-6 tracking-[-0.02em]">
            Therapist-in-Training
          </p>
        </div>
      </div>
      <div className="flex gap-2 py-2 lg:py-0 items-center">
        <div className="flex justify-center items-center">
          <CalendarIcon />
        </div>
        <div className="flex flex-col gap-1 text-[16px] leading-[18px] tracking-[-0.02em]">
          <p>{sessionDate}</p>
          <p className="font-[300]">{sessionTime}</p>
        </div>
      </div>
    </div>
  );
};
