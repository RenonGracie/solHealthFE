import * as Sentry from '@sentry/react';

interface UserInfo {
  responseId?: string;
}

export const setSentryUser = (userInfo: UserInfo) => {
  Sentry.setUser(userInfo);
};
