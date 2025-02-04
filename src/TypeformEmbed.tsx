import { Widget } from '@typeform/embed-react';

function TypeformEmbed() {
  return (
    <Widget
      id={import.meta.env.VITE_TYPEFORM_ID as string}
      className="h-screen"
    />
  );
}

export default TypeformEmbed;
