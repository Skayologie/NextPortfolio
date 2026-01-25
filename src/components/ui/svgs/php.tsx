import type { SVGProps } from "react";

const Php = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <path
      d="M0 50c0-15 12-25 27-25h202c15 0 27 10 27 25v156c0 15-12 25-27 25H27c-15 0-27-10-27-25V50z"
      fill="#777BB4"
    />
    <path
      d="M30 80c0-8 6-14 14-14h168c8 0 14 6 14 14v96c0 8-6 14-14 14H44c-8 0-14-6-14-14V80z"
      fill="#fff"
    />
    <text x="50" y="140" fontSize="40" fontWeight="bold" fill="#777BB4">
      PHP
    </text>
  </svg>
);

export { Php };
