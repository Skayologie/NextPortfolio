import type { SVGProps } from "react";

const Git = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <rect width="256" height="256" rx="28" fill="#F34F29" />
    <path
      d="M110 62l20 20a18 18 0 0120 4l12 12a18 18 0 01-4 20l-10 10v28a18 18 0 11-12 0v-22l-12 12v38a18 18 0 11-12 0v-32a18 18 0 01-4-20l18-18-16-16a18 18 0 010-26l10-10z"
      fill="#fff"
    />
  </svg>
);

export { Git };
