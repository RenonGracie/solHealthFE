import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { isMatch, addDays, format } from 'date-fns';

import { CALENDAR_GROUP_DATE_FORMAT } from '@/constants';

import { groupByDay } from './groupByDay';

describe('groupByDay', () => {
  const originalDate = global.Date;
  let mockNow: Date;

  beforeEach(() => {
    mockNow = new Date();
    vi.spyOn(global, 'Date').mockImplementation((arg) => {
      return arg ? new originalDate(arg) : new originalDate(mockNow);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const createMockTimeSlots = () => {
    const day1 = addDays(mockNow, 2);
    const day2 = addDays(mockNow, 3);

    const slots = [];

    for (let i = 9; i <= 17; i++) {
      const date = new Date(day1);
      date.setHours(i, 0, 0, 0);
      slots.push(date.toISOString());
    }

    for (let i = 9; i <= 17; i++) {
      const date = new Date(day2);
      date.setHours(i, 0, 0, 0);
      slots.push(date.toISOString());
    }

    return slots;
  };

  const timeZone = 'Asia/Tbilisi';

  it('should group time slots by day in specified timezone', () => {
    const mockTimeSlots = createMockTimeSlots();
    const result = groupByDay(timeZone, mockTimeSlots);

    expect(Object.keys(result)).toHaveLength(2);

    const day1Key = format(addDays(mockNow, 2), CALENDAR_GROUP_DATE_FORMAT);
    const day2Key = format(addDays(mockNow, 3), CALENDAR_GROUP_DATE_FORMAT);

    expect(result).toHaveProperty(day1Key);
    expect(result).toHaveProperty(day2Key);

    expect(result[day1Key]).toHaveLength(9);
    expect(result[day2Key]).toHaveLength(9);
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
    const mockTimeSlots = createMockTimeSlots();

    const result = groupByDay(newYorkTimeZone, mockTimeSlots);

    expect(Object.keys(result).length).toBe(2);

    const totalSlots = Object.values(result).flat().length;
    expect(totalSlots).toBe(18);
  });

  it('should format dates according to CALENDAR_GROUP_DATE_FORMAT', () => {
    const mockTimeSlots = createMockTimeSlots();
    const result = groupByDay(timeZone, mockTimeSlots);

    Object.keys(result).forEach((dateKey) => {
      expect(isMatch(dateKey, CALENDAR_GROUP_DATE_FORMAT)).toBe(true);
    });
  });
});
