import { twMerge } from 'tailwind-merge';

export type TVideoPlayerProps = {
  videoUrl?: string;
  className?: string;
};

export const VideoPlayer = ({ videoUrl, className }: TVideoPlayerProps) => (
  <video
    className={twMerge('aspect-video rounded-[8px]', className)}
    controls
    data-testid="video-player"
  >
    <source src={videoUrl} type="video/mp4" />
  </video>
);
