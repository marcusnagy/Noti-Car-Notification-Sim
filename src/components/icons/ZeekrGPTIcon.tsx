import { IconProps } from './types';

export const ZeekrGPTIcon = ({ fill = "currentColor", size, height, width, className, ...props }: IconProps) => {
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
        <path d="M7 8h10" />
        <path d="M17 8l-10 8" />
        <path d="M7 16h10" />
        <path d="M9 12h6" />
        <circle cx="12" cy="12" r="1" fill={fill} />
      </g>
    </svg>
  );
}; 