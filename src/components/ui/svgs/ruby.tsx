import { type SVGProps } from "react";

export function Ruby(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.156 2.3L21.7 3.844L12 13.544L2.3 3.844L3.844 2.3L12 10.456L20.156 2.3Z"
        fill="#CC342D"
      />
      <path
        d="M12 13.544L21.7 3.844L22 4.144V19.856L21.7 20.156L12 10.456V13.544Z"
        fill="#A91E22"
      />
      <path
        d="M12 13.544V10.456L2.3 20.156L2 19.856V4.144L2.3 3.844L12 13.544Z"
        fill="#CC342D"
      />
      <path
        d="M12 10.456L3.844 2.3L2.3 3.844L12 13.544L21.7 3.844L20.156 2.3L12 10.456Z"
        fill="#E25E2B"
      />
      <path
        d="M12 13.544L2.3 3.844L2 4.144V19.856L2.3 20.156L12 10.456V13.544Z"
        fill="#A91E22"
      />
      <path
        d="M12 13.544L21.7 20.156L22 19.856V4.144L21.7 3.844L12 13.544Z"
        fill="#9C1E22"
      />
    </svg>
  );
}