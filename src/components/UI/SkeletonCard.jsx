import React from "react";

const SkeletonCard = () => {
  return (
    <div className="new-item-skeleton">
      <div className="skeleton-card-top">
        <div className="skeleton-author-circle skeleton-shimmer"></div>

        <div className="skeleton-timer skeleton-shimmer"></div>
      </div>

      <div className="skeleton-nft-image skeleton-shimmer"></div>

      <div className="skeleton-card-bottom">
        <div className="skeleton-title skeleton-shimmer"></div>

        <div className="skeleton-bottom-row">
          <div className="skeleton-price skeleton-shimmer"></div>

          <div className="skeleton-likes skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;