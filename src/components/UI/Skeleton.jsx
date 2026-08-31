import React from "react";

const Skeleton = ({ width = "100%", height = "20px", borderRadius = "4px" }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;
