import { IconProps } from './types';

export const FourScreenIcon = ({ fill = "currentColor", size, height, width, className, ...props }: IconProps) => {
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
        <rect x="3" y="3" width="18" height="14" rx="2" />
        <path d="M7 7h4" />
        <path d="M15 7h2" />
        <path d="M7 11h2" />
        <path d="M11 11h6" />
        <path d="M12 17v4" />
        <path d="M8 21h8" />
        <text x="13" y="10" fontSize="6" fill={fill}>AD</text>
      </g>
    </svg>
  );
}; 