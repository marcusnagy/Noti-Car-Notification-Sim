import { IconProps } from './types';

export const ZeekrPlacesIcon = ({ fill = "currentColor", size, height, width, className, ...props }: IconProps) => {
  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M12 21C16 21 20 17 20 12C20 7 16 3 12 3C8 3 4 7 4 12C4 17 8 21 12 21Z" />
        <path d="M8 8h8" />
        <path d="M16 8l-8 8" />
        <path d="M8 16h8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 9v6" />
        <path d="M9 12h6" />
      </g>
    </svg>
  );
}; 