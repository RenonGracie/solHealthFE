interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children, className = '' }: IProps) => {
  return (
    <span
      className={`
        px-[10px] py-[8px]
        rounded-[20px]
        border border-[#7B4720]
        bg-transparent
        text-sm font-light leading-[21px] text-center
        tracking-[-0.02em]
        ${className}
      `}
    >
      {children}
    </span>
  );
};
