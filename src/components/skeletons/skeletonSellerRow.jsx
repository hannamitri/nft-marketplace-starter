import React from "react";

const SkeletonSellerRow = () => {
  return (
    <li className="skeleton-seller-row">
      <div className="skeleton-seller-avatar"></div>

      <div className="skeleton-seller-info">
        <div className="skeleton-line w-50"></div>
        <div className="skeleton-line w-25"></div>
      </div>
    </li>
  );
};

export default SkeletonSellerRow;
