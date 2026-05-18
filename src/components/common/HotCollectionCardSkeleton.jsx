import React from "react";

const HotCollectionCardSkeleton = () => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft_coll nft-skeleton-hot-coll" aria-busy="true" aria-label="Loading collection">
        <div className="nft_wrap">
          <span className="nft-skeleton__shimmer nft-skeleton-hot-coll__image d-block" />
        </div>
        <div className="nft_coll_pp">
          <span className="nft-skeleton__shimmer nft-skeleton-hot-coll__avatar d-inline-block" />
        </div>
        <div className="nft_coll_info">
          <span className="nft-skeleton__shimmer nft-skeleton-hot-coll__title d-block" />
          <span className="nft-skeleton__shimmer nft-skeleton-hot-coll__sub d-block" />
        </div>
      </div>
    </div>
  );
};

export default HotCollectionCardSkeleton;
