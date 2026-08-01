import React from "react";
import Skeleton from "./Skeleton";

const NftCardSkeleton = ({ showCountdown = false }) => (
  <div className="nft__item nft-item-skeleton" aria-hidden="true">
    <div className="author_list_pp">
      <Skeleton width="50px" height="50px" borderRadius="50%" />
      <i className="fa fa-check"></i>
    </div>

    {showCountdown && (
      <div className="nft-item-skeleton-countdown">
        <Skeleton width="92px" height="26px" borderRadius="30px" />
      </div>
    )}

    <div className="nft__item_wrap">
      <Skeleton width="100%" height="320px" borderRadius="8px" />
    </div>

    <div className="nft-item-skeleton-info">
      <Skeleton width="65%" height="15px" borderRadius="2px" />
      <Skeleton width="45%" height="14px" borderRadius="2px" />
      <Skeleton width="34px" height="13px" borderRadius="2px" />
    </div>
  </div>
);

export default NftCardSkeleton;
