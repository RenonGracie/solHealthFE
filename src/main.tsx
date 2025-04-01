import './lib/sentry.ts';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TagManager from 'react-gtm-module';

import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';

const gtmId = import.meta.env.VITE_GTM_ID as unknown;

if (gtmId && typeof gtmId === 'string') {
  TagManager.initialize({ gtmId });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
