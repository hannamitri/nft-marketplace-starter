import React from "react";

const Skeleton = ({ width, height, borderRadius, maxWidth }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        maxWidth,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;
