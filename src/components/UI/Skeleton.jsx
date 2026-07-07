import React from "react";

const Skeleton = ({ width, height, borderRadius, style }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    ></div>
  );
};

export default Skeleton;
