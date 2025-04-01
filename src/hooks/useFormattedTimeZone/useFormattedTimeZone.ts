import * as React from 'react';

export const useFormattedTimeZone = () => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formattedTimeZone = React.useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: userTimeZone,
      timeZoneName: 'short',
    })
      .formatToParts(new Date())
      .find((part) => part.type === 'timeZoneName')?.value;
  }, [userTimeZone]);

  return { userTimeZone, formattedTimeZone };
};
