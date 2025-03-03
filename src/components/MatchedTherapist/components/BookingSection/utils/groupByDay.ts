import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import { CALENDAR_GROUP_DATE_FORMAT } from '@/constants';

export const groupByDay = (timeZone: string, timeSlots?: string[]) => {
  if (!timeSlots) return {};

  return timeSlots.reduce(
    (acc, slot) => {
      const date = new Date(slot);
      const localDate = toZonedTime(date, timeZone);
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
