import { format, addHours, isBefore } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import { CALENDAR_GROUP_DATE_FORMAT } from '@/constants';

export const groupByDay = (timeZone: string, timeSlots?: string[]) => {
  if (!timeSlots) return {};

  const nowUTC = new Date();
  const twentyFourHoursFromNowUTC = addHours(nowUTC, 24);

  return timeSlots.reduce(
    (acc, slot) => {
      const slotDateUTC = new Date(slot);

      if (isBefore(slotDateUTC, twentyFourHoursFromNowUTC)) {
        return acc;
      }

      const localDate = toZonedTime(slotDateUTC, timeZone);
      const dayKey = format(localDate, CALENDAR_GROUP_DATE_FORMAT);

      if (!acc[dayKey]) {
        acc[dayKey] = [];
      }

      acc[dayKey].push(localDate);

      return acc;
    },
    {} as Record<string, Date[]>,
  );
};
