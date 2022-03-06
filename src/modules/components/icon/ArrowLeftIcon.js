import React from "react";

const Comp = ({ width = 20, height = 20, fill='#6accb9' }) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      stroke={fill}
      strokeWidth={0.5}
      viewBox="0 0 16 16"
    >
      <path
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
  );
};

export default Comp;
