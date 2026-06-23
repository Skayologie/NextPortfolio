import type { SVGProps } from "react";

const Aws = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect width="24" height="24" rx="4" fill="#232F3E" />
    {/* A */}
    <path
      d="M2 13.5 L3.5 7 L5 13.5 M2.6 11.2 H4.4"
      stroke="#FF9900"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* W */}
    <path
      d="M6.5 7 L7.8 13 L9.2 9.5 L10.6 13 L11.9 7"
      stroke="#FF9900"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* S */}
    <path
      d="M15.8 7.8 C15.8 7.2 14.5 7 13.5 7.5 C13 7.8 13 8.5 13 9 C13 9.8 14.5 10.2 15.2 10.6 C16 11 16.5 11.8 16 12.6 C15.6 13.2 14.5 13.5 13.5 13.2"
      stroke="#FF9900"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
    {/* Smile arc with arrowheads */}
    <path
      d="M3.5 18 Q12 22.5 20.5 18"
      stroke="#FF9900"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
    <polyline
      points="3.5,18 2,16.8 2.5,19"
      stroke="#FF9900"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="20.5,18 22,16.8 21.5,19"
      stroke="#FF9900"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { Aws };
