import React from "react";

const Skeleton = ({ width, height, borderRadius, marginTop }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        marginTop,
      }}
    ></div>
  );
};

export default Skeleton;
