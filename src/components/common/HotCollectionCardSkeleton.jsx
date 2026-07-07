import React from "react";

const HotCollectionCardSkeleton = () => {
  return (
    <div className="col-md-3 col-sm-6 col-xs-12 mb30">
      <div className="nft_coll nft-skeleton-card">
        <div className="skeleton-image skeleton-shimmer"></div>
        <div className="skeleton-row skeleton-shimmer mt-3"></div>
        <div className="skeleton-row skeleton-shimmer"></div>
      </div>
    </div>
  );
};

export default HotCollectionCardSkeleton;
