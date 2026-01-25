import type { SVGProps } from "react";

const Aws = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <rect width="256" height="256" rx="28" fill="#232F3E" />
    <text
      x="54"
      y="140"
      fontSize="80"
      fontWeight="700"
      fill="#FF9900"
      fontFamily="Arial, sans-serif"
    >
      aws
    </text>
    <path d="M50 170c40 24 114 24 156 0" stroke="#FF9900" strokeWidth="8" fill="none" strokeLinecap="round" />
  </svg>
);

export { Aws };
