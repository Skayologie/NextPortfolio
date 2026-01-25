import type { SVGProps } from "react";

const Tailwind = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <path
      d="M128 0C57 0 10 30 10 80c0 40 30 60 60 70-10 20-30 40-50 50 50-10 100-20 130-60 20-30 30-60 30-100 0-50-47-80-118-80"
      fill="#06B6D4"
    />
    <path
      d="M30 180c20-10 40-30 50-50-30-10-60-30-60-70 0-50 47-80 118-80 71 0 118 30 118 80 0 40-10 70-30 100-30 40-80 50-130 60 20-10 40-30 50-50-30-10-60-30-90-30-40 0-70 20-90 50"
      fill="#0891B2"
    />
  </svg>
);

export { Tailwind };
