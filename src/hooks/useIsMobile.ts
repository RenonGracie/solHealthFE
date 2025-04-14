import * as React from 'react';

const MOBILE_BREAKPOINT = 1024;
const MATCH_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(MATCH_QUERY).matches
      : false,
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(MATCH_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isMobile;
};
