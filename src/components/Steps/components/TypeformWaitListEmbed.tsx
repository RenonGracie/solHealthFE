import * as React from 'react';
import { Widget } from '@typeform/embed-react';

export const TypeformWaitListEmbed: React.FC = () => {
  return (
    <Widget
      id={import.meta.env.VITE_WAIT_LIST_TYPEFORM_ID as string}
      className="h-screen"
    />
  );
};
