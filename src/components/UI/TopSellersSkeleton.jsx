import React from "react";

const TopSellersSkeleton = ({ items = 12 }) => {
  return (
    <>
      {[...Array(items)].map((_, index) => (
        <li key={index}>
          <div className="author_list_pp">
            <div className="skeleton skeleton-avatar"></div>
            <i className="fa fa-check"></i>
          </div>

          <div className="author_list_info">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text skeleton-text-small"></div>
          </div>
        </li>
      ))}
    </>
  );
};

export default TopSellersSkeleton;