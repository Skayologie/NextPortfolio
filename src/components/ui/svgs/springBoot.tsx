import type { SVGProps } from "react";

const SpringBoot = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <rect width="256" height="256" rx="36" fill="#6DB33F" />
    <path
      d="M128 60c-36 0-66 30-66 66s30 66 66 66 66-30 66-66-30-66-66-66zm0 24c23 0 42 19 42 42s-19 42-42 42-42-19-42-42 19-42 42-42z"
      fill="#fff"
    />
    <path
      d="M128 102c-13 0-24 11-24 24s11 24 24 24 24-11 24-24-11-24-24-24z"
      fill="#6DB33F"
    />
  </svg>
);

export { SpringBoot };
