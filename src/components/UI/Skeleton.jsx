import React from "react";

const Skeleton = () => {
  return (
    <li className="top-seller-skeleton">
      <div className="seller-skeleton-avatar"></div>
      <div className="seller-skeleton-info">
        <div className="seller-skeleton-name"></div>
        <div className="seller-skeleton-price"></div>
      </div>
    </li>
  );
};

const SkeletonBox = ({ width, height, borderRadius }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;
