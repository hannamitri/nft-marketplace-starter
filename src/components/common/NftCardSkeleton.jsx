import React from "react";
import "./nft-card-skeleton.css";

const NftCardSkeleton = () => {
  return (
    <div className="nft__item nft-card-skeleton" aria-hidden="true">
      <div className="author_list_pp">
        <span className="nft-card-skeleton__pulse nft-card-skeleton__avatar" />
      </div>
      <div className="de_countdown">
        <span className="nft-card-skeleton__pulse nft-card-skeleton__countdown-inner" />
      </div>
      <div className="nft__item_wrap">
        <span className="nft-card-skeleton__pulse nft-card-skeleton__preview" />
      </div>
      <div className="nft__item_info">
        <span className="nft-card-skeleton__pulse nft-card-skeleton__bar--title" />
        <div className="nft-card-skeleton__row">
          <span className="nft-card-skeleton__pulse nft-card-skeleton__bar--price" />
          <span className="nft-card-skeleton__pulse nft-card-skeleton__bar--like" />
        </div>
      </div>
    </div>
  );
};

export default NftCardSkeleton;
