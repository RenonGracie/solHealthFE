import * as React from 'react';
import { Widget } from '@typeform/embed-react';

interface IProps {
  onSubmit: (responseId: string) => void;
}

export const TypeformEmbed: React.FC<IProps> = ({ onSubmit }) => {
  return (
    <Widget
      id={import.meta.env.VITE_TYPEFORM_ID as string}
      className="h-screen"
      onSubmit={({ responseId }) => {
        onSubmit(responseId);
      }}
    />
  );
};
