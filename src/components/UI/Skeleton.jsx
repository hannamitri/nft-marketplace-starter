import React from "react";

const Skeleton = ({ width, height, borderRadius, margin }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        margin,
      }}
    ></div>
  );
};

export default Skeleton;
