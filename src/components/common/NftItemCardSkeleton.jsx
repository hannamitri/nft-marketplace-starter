import React from "react";

const NftItemCardSkeleton = ({ columnClassName, style }) => {
  return (
    <div className={columnClassName} style={style}>
      <div className="nft__item nft-skeleton" aria-busy="true" aria-label="Loading">
        <div className="author_list_pp">
          <span className="nft-skeleton__shimmer nft-skeleton__avatar d-inline-block" />
        </div>
        <div className="de_countdown" style={{ border: "none", background: "transparent" }}>
          <span className="nft-skeleton__shimmer nft-skeleton__countdown d-inline-block" />
        </div>
        <div className="nft__item_wrap">
          <div className="nft-skeleton__shimmer nft-skeleton__preview" />
        </div>
        <div className="nft__item_info">
          <span className="nft-skeleton__shimmer nft-skeleton__title d-block" />
          <div className="nft-skeleton__meta">
            <span className="nft-skeleton__shimmer nft-skeleton__price d-inline-block" />
            <span className="nft-skeleton__shimmer nft-skeleton__like d-inline-block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftItemCardSkeleton;
