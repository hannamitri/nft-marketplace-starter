import React from "react";

const Skeleton = ({ width, height, borderRadius, className = "" }) => {
  return (
    <div
      className={`skeleton-box ${className}`}
      style={{
        width: width || "100%",
        height: height || "20px",
        borderRadius: borderRadius || "4px",
        backgroundColor: "#e0e0e0",
        display: "inline-block",
      }}
    ></div>
  );
};

export default Skeleton;