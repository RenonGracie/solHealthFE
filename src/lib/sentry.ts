import * as Sentry from '@sentry/react';

const getTracesSampleRate = () => {
  return import.meta.env.VITE_ENV === 'dev' ? 1.0 : 0.1;
};

if (import.meta.env.VITE_ENV) {
  const commitHash = import.meta.env.VITE_COMMIT_HASH?.slice(0, 7) || '';

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN as string,
    environment: import.meta.env.VITE_ENV as string,
    release: commitHash,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.browserProfilingIntegration(),
      Sentry.replayIntegration(),
      Sentry.thirdPartyErrorFilterIntegration({
        filterKeys: [import.meta.env.VITE_SENTRY_PROJECT as string],
        behaviour: 'drop-error-if-exclusively-contains-third-party-frames',
      }),
    ],
    tracesSampleRate: getTracesSampleRate(),
    replaysSessionSampleRate: 0.0,
    replaysOnErrorSampleRate: 0.1,
  });
}
