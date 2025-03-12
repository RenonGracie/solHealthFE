import { format, addHours, isBefore } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import { CALENDAR_GROUP_DATE_FORMAT } from '@/constants';

export const groupByDay = (timeZone: string, timeSlots?: string[]) => {
  if (!timeSlots) return {};

  const now = new Date();
  const twentyFourHoursFromNow = addHours(now, 24);

  return timeSlots.reduce(
    (acc, slot) => {
      const date = new Date(slot);
      const localDate = toZonedTime(date, timeZone);

      if (isBefore(localDate, twentyFourHoursFromNow)) {
        return acc;
      }

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
