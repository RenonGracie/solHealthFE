interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children, className = '' }: IProps) => {
  return (
    <div
      className={`
        px-[10px] py-[8px]
        rounded-[20px]
        border border-[var(--brand-brown)]
        text-sm font-light leading-4 text-center
        tracking-[-0.02em]
        w-fit
        ${className}
      `}
    >
      {children}
    </div>
  );
};
