import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { VideoPlayer, TEST_ID } from './VideoPlayer';

describe('VideoPlayer', () => {
  const mockVideoUrl = 'https://example.com/video.mp4';

  it('renders video element with correct source', () => {
    render(<VideoPlayer videoUrl={mockVideoUrl} />);
    const videoElement = screen.getByTestId(TEST_ID);
    const sourceElement = videoElement.querySelector('source');

    expect(videoElement).toBeInTheDocument();
    expect(sourceElement).toHaveAttribute('src', mockVideoUrl);
    expect(sourceElement).toHaveAttribute('type', 'video/mp4');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-video-class';
    render(<VideoPlayer videoUrl={mockVideoUrl} className={customClass} />);

    const videoElement = screen.getByTestId(TEST_ID);
    expect(videoElement).toHaveClass(customClass);
  });

  it('has controls enabled', () => {
    render(<VideoPlayer videoUrl={mockVideoUrl} />);
    const videoElement = screen.getByTestId(TEST_ID);

    expect(videoElement).toHaveAttribute('controls');
  });
});
