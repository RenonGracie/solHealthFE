import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import { getYouTubeVideoId } from './utils';

export type TVideoPlayerProps = {
  videoUrl?: string;
  className?: string;
};

export const VideoPlayer = ({ videoUrl, className }: TVideoPlayerProps) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const videoId = getYouTubeVideoId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className={twMerge('relative', className)}>
      <iframe
        data-testid="video-player"
        className={twMerge(
          'w-full h-full aspect-video rounded-[8px] transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};
