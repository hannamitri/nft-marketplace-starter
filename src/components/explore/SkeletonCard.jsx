import React from "react";

const SkeletonCard = () => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
      <div className="nft__item skeleton">
        <div className="nft__item_wrap skeleton-image" />
        <div className="nft__item_info">
          <div className="skeleton-line skeleton-title" />
          <div className="d-flex justify-content-between mt-2">
            <div className="skeleton-line skeleton-price" />
            <div className="skeleton-line skeleton-likes" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
