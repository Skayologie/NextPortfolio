import type { SVGProps } from "react";

const Firebase = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <path d="M0 128l50-50L100 0l50 78L128 256 0 128z" fill="#FFA000" />
    <path d="M50 178L0 128l128 128 50-78-128 0" fill="#F57F17" />
    <path d="M100 78L50 128l78 0 50-78L100 0" fill="#FFD600" />
    <path d="M100 78l78 0 50-78L128 256" fill="#FFA000" />
  </svg>
);

export { Firebase };
