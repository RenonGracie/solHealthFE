export type TVideoPlayerProps = {
  videoUrl?: string;
  className?: string;
};

export const TEST_ID = 'video-player';

export const VideoPlayer = ({ videoUrl, className }: TVideoPlayerProps) => (
  <video className={className} controls data-testid={TEST_ID}>
    <source src={videoUrl} type="video/mp4" />
  </video>
);
