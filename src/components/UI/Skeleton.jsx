import React from "react";

const Skeleton = ({ width, height }) => {
  return (
    <div
      className="skeleton"
      style={{
        width: width,
        height: height,
      }}
    ></div>
  );
};

export default Skeleton;