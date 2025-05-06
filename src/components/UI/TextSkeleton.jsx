import React from "react";

const TextSkeleton = ({ width = "80%", height = "20px", marginBottom = "10px" }) => (
  <div className="skeleton-box" style={{ width, height, marginBottom }}></div>
);

export default TextSkeleton;
