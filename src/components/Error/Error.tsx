interface IProps {
  children: React.ReactNode;
}

export const Error = ({ children }: IProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-2xl font-bold text-center">{children}</div>
    </div>
  );
};
