// SkeletonLoader.jsx

import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-loader-image"></div>
      <div className="skeleton-loader-details">
        <div className="skeleton-loader-title"></div>
        <div className="skeleton-loader-price"></div>
        <div className="skeleton-loader-like"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
