import { IconProps } from './types';

export const NaviIcon = ({ fill = "currentColor", size, height, width, className, ...props }: IconProps) => {
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
        <path d="M12 3L2 12H5V20C5 20.5523 5.44772 21 6 21H9C9.55228 21 10 20.5523 10 20V14H14V20C14 20.5523 14.4477 21 15 21H18C18.5523 21 19 20.5523 19 20V12H22L12 3Z" />
        <path d="M12 8L17 12V19H15V13H9V19H7V12L12 8Z" />
      </g>
    </svg>
  );
}; 