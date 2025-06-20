import React from "react";

const Skeleton = ({ width, height, borderRadius, ...styles }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        ...styles
      }}
    ></div>
  );
};

export default Skeleton;
