import type { SVGProps } from "react";

const Angular = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <path d="M128 6L16 42l18 148 94 60 94-60 18-148-112-36z" fill="#DD0031" />
    <path d="M128 32l84 28-14 118-70 44-70-44-14-118 84-28z" fill="#C3002F" />
    <path
      d="M128 64l-46 118h26l8-22h24l8 22h26L128 64zm-2 72l6-18 6 18h-12z"
      fill="#fff"
    />
  </svg>
);

export { Angular };
