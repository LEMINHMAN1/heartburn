import React from "react";

const Comp = ({ className='', width = 16, height = 16, fill = "#6accb9" }) => {
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
      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
    </svg>
  );
};

export default Comp;
