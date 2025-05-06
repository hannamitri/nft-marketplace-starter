import React from "react";

const ImageSkeleton = ({ width = "100%", height = "300px" }) => (
  <div className="skeleton-box" style={{ width, height }}></div>
);

export default ImageSkeleton;
