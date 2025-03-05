import * as React from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import CalendarIcon from '@/assets/icons/calendar-icon.svg';
import { VideoPlayer } from '@/components/ui';
import { BookAppointmentResponse } from '@/api/services';
import { PLACEHOLDER_IMAGE_PATH } from '@/constants';

interface IProps {
  bookingData: BookAppointmentResponse | null;
  therapistImageLink?: string;
  therapistVideoLink?: string;
}

export const SessionInfo = ({
  bookingData,
  therapistImageLink,
  therapistVideoLink,
}: IProps) => {
  const { PractitionerName, StartDateIso, EndDateIso } = bookingData || {};

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const sessionDate = React.useMemo(() => {
    if (!StartDateIso) return '';

    const zonedDate = toZonedTime(new Date(StartDateIso), userTimeZone);

    return format(zonedDate, 'EEE, MMM dd');
  }, [StartDateIso, userTimeZone]);

  const sessionTime = React.useMemo(() => {
    if (!StartDateIso || !EndDateIso) return '';

    const zonedStartDate = toZonedTime(new Date(StartDateIso), userTimeZone);
    const zonedEndDate = toZonedTime(new Date(EndDateIso), userTimeZone);

    const startTime = format(zonedStartDate, 'h:mmaaa');
    const endTime = format(zonedEndDate, 'h:mmaaa');

    return `${startTime} - ${endTime} ${userTimeZone}`;
  }, [StartDateIso, EndDateIso, userTimeZone]);

  return (
    <div className="flex flex-col rounded-[8px] border border-[#7B4720] px-4 lg:px-6 py-6 gap-2 lg:gap-4">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-1">
        <div className="flex gap-4 items-center">
          <img
            src={therapistImageLink || PLACEHOLDER_IMAGE_PATH}
            alt={`${PractitionerName} photo`}
            className="w-[80px] h-[80px] rounded-full object-cover"
          />
          <div>
            <h2 className="text-[32px] font-normal font-['Very_Vogue_Text']">
              {PractitionerName}
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
          <div className="flex flex-col gap-1 text-base tracking-[-0.02em]">
            <p>{sessionDate}</p>
            <p>{sessionTime}</p>
          </div>
        </div>
      </div>
      <VideoPlayer videoUrl={therapistVideoLink} />
    </div>
  );
};
