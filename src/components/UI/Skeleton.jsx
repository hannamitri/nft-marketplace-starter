import React from "react";

const Skeleton = ({ width, height, borderRadius, ...rest }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        ...rest,
      }}
    ></div>
  );
};

export default Skeleton;
