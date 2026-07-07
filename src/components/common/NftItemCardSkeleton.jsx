import React from "react";

const NftItemCardSkeleton = () => {
  return (
    <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item nft-skeleton-card">
        <div className="skeleton-circle skeleton-shimmer"></div>
        <div className="skeleton-pill skeleton-shimmer"></div>
        <div className="skeleton-image skeleton-shimmer"></div>
        <div className="skeleton-title skeleton-shimmer"></div>
        <div className="skeleton-row skeleton-shimmer"></div>
      </div>
    </div>
  );
};

export default NftItemCardSkeleton;
