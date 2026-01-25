import React from "react";
import "./Skeleton.css";

function Skeleton({ width, height, borderRadius = "8px" }) {
  return (
    <div
      className="skeleton-shimmer"
      style={{ width, height, borderRadius }}
    />
  );
}

export default Skeleton;