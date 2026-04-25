import React from "react";

const TopSellerRowSkeleton = () => {
  return (
    <li className="nft-skeleton-top-seller__row" aria-busy="true" aria-label="Loading seller">
      <div className="author_list_pp">
        <span className="nft-skeleton__shimmer nft-skeleton-top-seller__avatar d-inline-block" />
      </div>
      <div className="author_list_info">
        <span className="nft-skeleton__shimmer nft-skeleton-top-seller__name d-block" />
        <span className="nft-skeleton__shimmer nft-skeleton-top-seller__eth d-block" />
      </div>
    </li>
  );
};

export default TopSellerRowSkeleton;
