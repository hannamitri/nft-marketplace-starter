import React from "react";

const Skeleton = ({ width = "100%", height = "250px", borderRadius = "8px" }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        backgroundColor: "#e0e0e0",
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;
