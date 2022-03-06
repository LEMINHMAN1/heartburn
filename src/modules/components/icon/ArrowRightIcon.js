import React from "react";

const Comp = ({ className='', width = 20, height = 20, fill='#fff' }) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      stroke={fill}
      strokeWidth={0.5}
      className={className}
      viewBox="0 0 16 16"
    >
      <path
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );
};

export default Comp;
