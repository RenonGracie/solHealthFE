import { describe, it, expect } from 'vitest';

import { getYouTubeVideoId } from './getYouTubeVideoId';

const VIDEO_ID = 'dQw4w9WgXcQ';

describe('getYouTubeVideoId', () => {
  it('returns empty string when url is undefined', () => {
    expect(getYouTubeVideoId(undefined)).toBe('');
  });

  it('returns empty string when url is empty', () => {
    expect(getYouTubeVideoId('')).toBe('');
  });

  it('returns empty string for invalid youtube url', () => {
    expect(getYouTubeVideoId('https://example.com')).toBe('');
  });

  it('extracts video id from standard youtube watch url', () => {
    expect(
      getYouTubeVideoId(`https://www.youtube.com/watch?v=${VIDEO_ID}`),
    ).toBe(VIDEO_ID);
  });

  it('extracts video id from shortened youtube url', () => {
    expect(getYouTubeVideoId(`https://youtu.be/${VIDEO_ID}`)).toBe(VIDEO_ID);
  });

  it('extracts video id from embed url', () => {
    expect(getYouTubeVideoId(`https://www.youtube.com/embed/${VIDEO_ID}`)).toBe(
      VIDEO_ID,
    );
  });

  it('extracts video id from url with additional parameters', () => {
    expect(
      getYouTubeVideoId(`https://www.youtube.com/watch?v=${VIDEO_ID}&t=123`),
    ).toBe(VIDEO_ID);
  });
});
