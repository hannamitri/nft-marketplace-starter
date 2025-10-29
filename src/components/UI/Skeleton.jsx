import React from "react";

const Skeleton = ({ width = '40px', height = '40px', borderRadius = '50%' }) => {
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
