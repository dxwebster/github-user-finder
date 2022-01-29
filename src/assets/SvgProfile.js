import * as React from "react";

function SvgProfile(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 14 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        stroke="currentColor"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.5 10.5h-3a5 5 0 00-5 5h13a5 5 0 00-5-5z" />
        <circle cx={7} cy={4} r={3.5} />
      </g>
    </svg>
  );
}

export default SvgProfile;