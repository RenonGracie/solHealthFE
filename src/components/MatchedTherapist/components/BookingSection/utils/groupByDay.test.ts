import { describe, it, expect } from 'vitest';
import { isMatch } from 'date-fns';

import { CALENDAR_GROUP_DATE_FORMAT } from '@/constants';

import { groupByDay } from './groupByDay';

const MOCK_TIME_SLOTS = [
  'Thu, 20 Feb 2025 15:00:00 GMT',
  'Thu, 20 Feb 2025 16:00:00 GMT',
  'Thu, 20 Feb 2025 17:00:00 GMT',
  'Thu, 20 Feb 2025 18:00:00 GMT',
  'Thu, 20 Feb 2025 19:00:00 GMT',
  'Thu, 20 Feb 2025 20:00:00 GMT',
  'Thu, 20 Feb 2025 21:00:00 GMT',
  'Thu, 20 Feb 2025 22:00:00 GMT',
  'Thu, 20 Feb 2025 23:00:00 GMT',
  'Fri, 21 Feb 2025 00:00:00 GMT',
  'Fri, 21 Feb 2025 01:00:00 GMT',
  'Fri, 21 Feb 2025 02:00:00 GMT',
  'Fri, 21 Feb 2025 03:00:00 GMT',
  'Fri, 21 Feb 2025 04:00:00 GMT',
  'Fri, 21 Feb 2025 05:00:00 GMT',
  'Fri, 21 Feb 2025 06:00:00 GMT',
  'Fri, 21 Feb 2025 07:00:00 GMT',
  'Fri, 21 Feb 2025 08:00:00 GMT',
  'Fri, 21 Feb 2025 09:00:00 GMT',
  'Fri, 21 Feb 2025 10:00:00 GMT',
  'Fri, 21 Feb 2025 11:00:00 GMT',
  'Fri, 21 Feb 2025 12:00:00 GMT',
  'Fri, 21 Feb 2025 13:00:00 GMT',
  'Fri, 21 Feb 2025 14:00:00 GMT',
  'Fri, 21 Feb 2025 15:00:00 GMT',
  'Fri, 21 Feb 2025 16:00:00 GMT',
];

describe('groupByDay', () => {
  const timeZone = 'Asia/Tbilisi';

  it('should group time slots by day in specified timezone', () => {
    const result = groupByDay(timeZone, MOCK_TIME_SLOTS);

    expect(Object.keys(result)).toHaveLength(2);

    expect(result).toHaveProperty('2025-02-20');
    expect(result).toHaveProperty('2025-02-21');

    expect(result['2025-02-20']).toHaveLength(5);
    expect(result['2025-02-21']).toHaveLength(21);
  });

  it('should return empty object when timeSlots is undefined', () => {
    const result = groupByDay(timeZone, undefined);
    expect(result).toEqual({});
  });

  it('should return empty object when timeSlots is empty array', () => {
    const result = groupByDay(timeZone, []);
    expect(result).toEqual({});
  });

  it('should handle different timezones correctly', () => {
    const newYorkTimeZone = 'America/New_York';

    const result = groupByDay(newYorkTimeZone, MOCK_TIME_SLOTS);

    expect(Object.keys(result)).toHaveLength(2);

    expect(result).toHaveProperty('2025-02-20');
    expect(result).toHaveProperty('2025-02-21');

    expect(result['2025-02-20']).toHaveLength(14);
    expect(result['2025-02-21']).toHaveLength(12);
  });

  it('should format dates according to CALENDAR_GROUP_DATE_FORMAT', () => {
    const result = groupByDay(timeZone, MOCK_TIME_SLOTS);

    Object.keys(result).forEach((dateKey) => {
      expect(isMatch(dateKey, CALENDAR_GROUP_DATE_FORMAT)).toBe(true);
    });
  });
});
