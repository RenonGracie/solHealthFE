export const getYouTubeVideoId = (url?: string) => {
  if (!url) return '';

  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;

  const match = url.match(regExp);

  return match?.[2] || '';
};
