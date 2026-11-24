import React from "react";

const Skeleton = ({ width, height, borderRadius, className = "" }) => {
  return (
    <div
      className={`skeleton-box${className ? ` ${className}` : ""}`}
      style={{
        width,
        height,
        borderRadius,
      }}
      aria-hidden="true"
    ></div>
  );
};

export default Skeleton;
