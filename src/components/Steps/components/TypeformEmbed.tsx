import * as React from 'react';
import { Widget } from '@typeform/embed-react';

import { GTM_EVENTS, trackEvent } from '@/lib/gtm';
import { getClientIdFromGaCookie } from '@/lib/ga';
import { getUtmParams } from '@/lib/utm';
import { TYPEFORM_HIDDEN_FIELDS } from '@/constants';

const gtmId = import.meta.env.VITE_GTM_ID as unknown;

interface IProps {
  onSubmit: (responseId: string) => void;
}

export const TypeformEmbed: React.FC<IProps> = ({ onSubmit }) => {
  const [clientId, setClientId] = React.useState('');

  const utmParams = React.useMemo(() => getUtmParams(), []);

  const hiddenFields = React.useMemo(() => {
    if (!gtmId) return;

    return { [TYPEFORM_HIDDEN_FIELDS.CLIENT_ID]: clientId, ...utmParams };
  }, [clientId, utmParams]);

  React.useEffect(() => {
    if (!gtmId) return;

    trackEvent(GTM_EVENTS.FORM_STARTED);

    let id = getClientIdFromGaCookie();

    if (id) {
      setClientId(id);
      return;
    }

    const interval = setInterval(() => {
      id = getClientIdFromGaCookie();

      if (id) {
        setClientId(id);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Widget
      id={import.meta.env.VITE_TYPEFORM_ID as string}
      className="h-screen"
      onSubmit={({ responseId }) => {
        trackEvent(GTM_EVENTS.FORM_SUBMITTED);
        onSubmit(responseId);
      }}
      hidden={hiddenFields}
    />
  );
};
