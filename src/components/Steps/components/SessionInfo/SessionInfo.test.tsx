import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { format } from 'date-fns';

import { PLACEHOLDER_IMAGE_PATH } from '@/constants';
import { SessionInfo } from '../SessionInfo';

const MOCK_PROPS = {
  therapistName: 'John Doe',
  therapistImageLink: 'https://example.com/photo.jpg',
  startDate: '2024-03-27T10:00:00Z',
  endDate: '2024-03-27T10:45:00Z',
};

describe('SessionInfo', () => {
  it('renders therapist information correctly', () => {
    render(<SessionInfo {...MOCK_PROPS} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Therapist-in-Training')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe photo')).toHaveAttribute(
      'src',
      'https://example.com/photo.jpg',
    );
  });

  it('uses placeholder image when therapistImageLink is not provided', () => {
    const propsWithoutImage = { ...MOCK_PROPS, therapistImageLink: undefined };
    render(<SessionInfo {...propsWithoutImage} />);

    expect(screen.getByAltText('John Doe photo')).toHaveAttribute(
      'src',
      PLACEHOLDER_IMAGE_PATH,
    );
  });

  it('formats session date correctly', () => {
    const date = new Date('2024-03-27T10:00:00Z');
    const formattedDate = format(date, 'EEE, MMM dd');

    render(<SessionInfo {...MOCK_PROPS} />);

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('formats session time correctly', () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const startDate = new Date('2024-03-27T10:00:00Z');
    const endDate = new Date('2024-03-27T10:45:00Z');

    const startTime = format(startDate, 'h:mmaaa');
    const endTime = format(endDate, 'h:mmaaa');
    const expectedTime = `${startTime} - ${endTime} ${timeZone}`;

    render(<SessionInfo {...MOCK_PROPS} />);

    expect(screen.getByText(expectedTime)).toBeInTheDocument();
  });

  it('handles missing date props', () => {
    const propsWithoutDates = {
      ...MOCK_PROPS,
      startDate: undefined,
      endDate: undefined,
    };

    render(<SessionInfo {...propsWithoutDates} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText(/am|pm/i)).not.toBeInTheDocument();
  });

  it('renders calendar icon', () => {
    render(<SessionInfo {...MOCK_PROPS} />);

    const calendarIcon = document.querySelector('svg');
    expect(calendarIcon).toBeInTheDocument();
  });
});
