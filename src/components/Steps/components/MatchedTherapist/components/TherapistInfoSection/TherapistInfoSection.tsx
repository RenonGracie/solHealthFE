import * as React from 'react';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export const TherapistInfoSection: React.FC<IProps> = ({ title, children }) => (
  <section className="text-base font-light leading-5">
    <span className="text-xl leading-6 font-normal very-vogue-text">
      {title}{' '}
    </span>
    {children}
  </section>
);
