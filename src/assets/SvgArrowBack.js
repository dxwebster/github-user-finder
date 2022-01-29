import * as React from 'react';

function SvgArrowBack(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="arrow_svg__feather arrow_svg__feather-arrow-left"
      width="1.3em"
      height="1.3em"
      {...props}
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export default SvgArrowBack;