import LogoIcon from '@/assets/icons/logo-icon.svg';

export const AppLogo = () => {
  return (
    <div className="flex items-center justify-center gap-2 ">
      <h3 className="text-[22px] lg:text-[28px] font-medium font-['Comfortaa']">
        Sol Health
      </h3>
      <LogoIcon />
    </div>
  );
};
