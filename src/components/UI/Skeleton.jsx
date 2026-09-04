import React from "react";

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius }}
    />
  );
};
export default Skeleton;
