import { IconProps } from './types';

export const CarSyncIcon = ({ fill = "currentColor", size, height, width, className, ...props }: IconProps) => {
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
        <path d="M5 11l2-2m0 0l2-2M7 9L5 7" />
        <path d="M19 13l-2 2m0 0l-2 2m2-2l2 2" />
        <path d="M17.8 5.2C17.8 5.2 16 2 12 2C8 2 6.2 5.2 6.2 5.2L3 11V19C3 20.1046 3.89543 21 5 21H7C8.10457 21 9 20.1046 9 19V18H15V19C15 20.1046 15.8954 21 17 21H19C20.1046 21 21 20.1046 21 19V11L17.8 5.2Z" />
        <path d="M7 14H8" />
        <path d="M16 14H17" />
      </g>
    </svg>
  );
}; 