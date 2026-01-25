import type { SVGProps } from "react";

const MongoDb = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <path
      d="M128 10c40 0 70 30 70 80v120c0 10-5 20-15 25-70 30-140 30-210 0-10-5-15-15-15-25V90C58 40 88 10 128 10zm0 20c-32 0-55 24-55 60 0 28 20 50 45 50 28 0 48-22 48-50 0-36-23-60-55-60z"
      fill="#13AA52"
    />
    <circle cx="128" cy="50" r="25" fill="#00AD16" />
  </svg>
);

export { MongoDb };
