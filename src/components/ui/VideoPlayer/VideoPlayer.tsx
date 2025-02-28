import { twMerge } from 'tailwind-merge';

import { getYouTubeVideoId } from './utils';

export type TVideoPlayerProps = {
  videoUrl?: string;
  className?: string;
};

export const VideoPlayer = ({ videoUrl, className }: TVideoPlayerProps) => {
  const videoId = getYouTubeVideoId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      data-testid="video-player"
      className={twMerge('aspect-video rounded-[8px]', className)}
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};
