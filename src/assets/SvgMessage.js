import * as React from 'react';

function SvgMessage(props) {
  return (
    <svg width="1.3em" height="1.3em" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="currentColor" fillRule="nonzero">
        <path d="M9 7.867l7.03-3.75a1 1 0 11.94 1.765l-7.5 4a1 1 0 01-.94 0l-7.5-4a1 1 0 01.94-1.764L9 7.867z" />
        <path d="M15.5 13.5v-11h-13v11h13zm0 2h-13a2 2 0 01-2-2v-11a2 2 0 012-2h13a2 2 0 012 2v11a2 2 0 01-2 2z" />
      </g>
    </svg>
  );
}

export default SvgMessage;