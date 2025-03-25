import React from "react";

const Skeleton = ({ width, height, borderRadius, left }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        left,
      }}
    ></div>
  );
};

export default Skeleton;
