import type { SVGProps } from "react";

const Express = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <rect width="256" height="256" rx="28" fill="#161616" />
    <text
      x="34"
      y="150"
      fontSize="72"
      fontWeight="600"
      fill="#f2f2f2"
      fontFamily="Arial, sans-serif"
    >
      express
    </text>
  </svg>
);

export { Express };
