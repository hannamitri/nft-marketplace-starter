import React from "react";

const Skeleton = ({
  width,
  height,
  borderRadius,
  top,
  left,
  right,
  bottom,
}) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        top,
        left,
        right,
        bottom,
      }}
    ></div>
  );
};

export default Skeleton;
