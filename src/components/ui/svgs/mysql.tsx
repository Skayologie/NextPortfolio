import type { SVGProps } from "react";

const MySql = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <rect width="256" height="256" rx="32" fill="#005C84" />
    <path
      d="M70 184c12-20 24-32 40-40-6-10-12-20-12-32 0-18 12-34 30-34 20 0 34 18 34 38 0 12-6 24-12 34 16 8 28 20 40 40l-20 12c-12-18-26-30-42-30s-30 12-42 30l-16-18z"
      fill="#fff"
    />
    <circle cx="130" cy="82" r="10" fill="#F29111" />
  </svg>
);

export { MySql };
