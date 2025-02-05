import { IconProps } from './types';

export const ZeekrCircleIcon = ({ fill = "currentColor", size, height, width, className, ...props }: IconProps) => {
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
        <circle cx="12" cy="12" r="10" />
        <path d="M8 8h8" />
        <path d="M16 8l-8 8" />
        <path d="M8 16h8" />
        <circle cx="8" cy="12" r="2" />
        <circle cx="16" cy="12" r="2" />
        <path d="M12 14c1 0.5 2 0.5 3 0" />
      </g>
    </svg>
  );
}; 