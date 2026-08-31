import React from "react";

const SkeletonAuthor = () => {
  return (
    <li className="top-seller-loading-item">
      <span className="top-seller-loading-rank skeleton-shimmer"></span>

      <div className="top-seller-loading-avatar skeleton-shimmer"></div>

      <div className="top-seller-loading-copy">
        <div className="top-seller-loading-name skeleton-shimmer"></div>

        <div className="top-seller-loading-price skeleton-shimmer"></div>
      </div>
    </li>
  );
};

export default SkeletonAuthor;