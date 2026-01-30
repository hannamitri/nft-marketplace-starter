import React from "react";

const Skeleton = ({ width, height, borderRadius, style }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width: width || "100%",
        height: height || "20px",
        borderRadius: borderRadius || "4px",
        ...style,
      }}
    ></div>
  );
};

export default Skeleton;