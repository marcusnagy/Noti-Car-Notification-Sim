import { ApplicationName } from '@/types/notification';
import { FourScreenIcon } from './FourScreenIcon.tsx';
import { CarSyncIcon } from './CarSyncIcon.tsx';
import { ZeekrGPTIcon } from './ZeekrGPTIcon.tsx';
import { ZeekrPlacesIcon } from './ZeekrPlacesIcon.tsx';
import { NaviIcon } from './NaviIcon.tsx';
import { ZeekrCircleIcon } from './ZeekrCircleIcon.tsx';

interface IconProps {
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
  className?: string;
}

export const getAppIcon = (appName: ApplicationName) => {
  switch (appName) {
    case "4screen":
      return <FourScreenIcon className="h-5 w-5 stroke-indigo-500 dark:stroke-indigo-400" />;
    case "carsync":
      return <CarSyncIcon className="h-5 w-5 stroke-cyan-500 dark:stroke-cyan-400" />;
    case "ZeekrGPT":
      return <ZeekrGPTIcon className="h-5 w-5 stroke-purple-500 dark:stroke-purple-400" />;
    case "Zeekr Places":
      return <ZeekrPlacesIcon className="h-5 w-5 stroke-rose-500 dark:stroke-rose-400" />;
    case "Navi":
      return <NaviIcon className="h-5 w-5 stroke-teal-500 dark:stroke-teal-400" />;
    case "Zeekr Circle":
      return <ZeekrCircleIcon className="h-5 w-5 stroke-orange-500 dark:stroke-orange-400" />;
    default:
      return null;
  }
};

export { FourScreenIcon, CarSyncIcon, ZeekrGPTIcon, ZeekrPlacesIcon, NaviIcon, ZeekrCircleIcon }; 