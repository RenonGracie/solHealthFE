import * as React from 'react';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export const TherapistInfoSection: React.FC<IProps> = ({ title, children }) => (
  <section className="text-base font-light leading-5">
    <span className="text-xl font-normal leading-6 font-['Very_Vogue_Text']">
      {title}{' '}
    </span>
    {children}
  </section>
);
