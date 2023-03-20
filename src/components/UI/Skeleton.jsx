import React from "react";

const Skeleton = ({ width, height, borderradius }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderradius,
      }}
    ></div>
  );
};

export default Skeleton;
