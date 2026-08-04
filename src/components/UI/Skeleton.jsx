import React from "react";

const Skeleton = ({
  className = "",
  width,
  height,
  borderRadius,
}) => {
  return (
    <div
      className={`skeleton-box ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export default Skeleton;
