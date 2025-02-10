export type TVideoPlayerProps = {
  videoUrl?: string;
  className?: string;
};

export const VideoPlayer = ({ videoUrl, className }: TVideoPlayerProps) => (
  <video className={className} controls data-testid="video-player">
    <source src={videoUrl} type="video/mp4" />
  </video>
);
