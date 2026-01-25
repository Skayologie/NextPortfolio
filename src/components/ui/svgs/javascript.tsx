import type { SVGProps } from "react";

const Javascript = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <rect width="256" height="256" rx="28" fill="#F7DF1E" />
    <text
      x="70"
      y="170"
      fontSize="120"
      fontWeight="700"
      fill="#000"
      fontFamily="Arial, sans-serif"
    >
      JS
    </text>
  </svg>
);

export { Javascript };
