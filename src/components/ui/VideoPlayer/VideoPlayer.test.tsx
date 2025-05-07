import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { VideoPlayer } from './VideoPlayer';

const VIDEO_ID = 'dQw4w9WgXcQ';
const MOCK_YOU_TUBE_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;

describe('VideoPlayer', () => {
  it('renders iframe with correct YouTube embed URL', () => {
    render(<VideoPlayer videoUrl={MOCK_YOU_TUBE_URL} />);
    const iframeElement = screen.getByTestId('video-player');

    expect(iframeElement).toBeInTheDocument();
    expect(iframeElement).toHaveAttribute(
      'src',
      `https://www.youtube.com/embed/${VIDEO_ID}`,
    );
  });

  it('renders iframe with empty video id when no URL provided', () => {
    render(<VideoPlayer />);
    const iframeElement = screen.getByTestId('video-player');

    expect(iframeElement).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/',
    );
  });

  it('has correct iframe attributes for YouTube embedding', () => {
    render(<VideoPlayer videoUrl={MOCK_YOU_TUBE_URL} />);
    const iframeElement = screen.getByTestId('video-player');

    expect(iframeElement).toHaveAttribute('title', 'YouTube video player');
    expect(iframeElement).toHaveAttribute('allowFullScreen');
    expect(iframeElement).toHaveAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    );
  });
});
