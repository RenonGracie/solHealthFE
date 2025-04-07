import * as React from 'react';
import { Widget } from '@typeform/embed-react';
import { GTM_EVENTS, trackEvent } from '@/lib/gtm';

interface IProps {
  onSubmit: (responseId: string) => void;
}

export const TypeformEmbed: React.FC<IProps> = ({ onSubmit }) => {
  return (
    <Widget
      id={import.meta.env.VITE_TYPEFORM_ID as string}
      className="h-screen"
      onReady={() => {
        trackEvent(GTM_EVENTS.FORM_STARTED);
      }}
      onSubmit={({ responseId }) => {
        trackEvent(GTM_EVENTS.FORM_SUBMITTED);
        onSubmit(responseId);
      }}
    />
  );
};
