import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { useFormattedTimeZone } from '../useFormattedTimeZone';

describe('useFormattedTimeZone', () => {
  const mockDateTimeFormat = vi.spyOn(Intl, 'DateTimeFormat');
  const mockDate = new Date('2024-01-15T12:00:00Z');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return correct timezone for America/New_York', () => {
    mockDateTimeFormat.mockImplementation(
      () =>
        ({
          resolvedOptions: () => ({ timeZone: 'America/New_York' }),
          formatToParts: () => [{ type: 'timeZoneName', value: 'EST' }],
        }) as unknown as Intl.DateTimeFormat,
    );

    const { result } = renderHook(() => useFormattedTimeZone());

    expect(result.current.userTimeZone).toBe('America/New_York');
    expect(result.current.formattedTimeZone).toBe('EST');
  });

  it('should return GMT format for other timezones', () => {
    mockDateTimeFormat.mockImplementation(
      () =>
        ({
          resolvedOptions: () => ({ timeZone: 'Asia/Tbilisi' }),
          formatToParts: () => [{ type: 'timeZoneName', value: 'GMT+4' }],
        }) as unknown as Intl.DateTimeFormat,
    );

    const { result } = renderHook(() => useFormattedTimeZone());

    expect(result.current.userTimeZone).toBe('Asia/Tbilisi');
    expect(result.current.formattedTimeZone).toBe('GMT+4');
  });
});
