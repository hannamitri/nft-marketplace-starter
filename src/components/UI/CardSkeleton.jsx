import React from "react";

export default function CardSkeleton() {
  return (
    <div className="nft__item nft__item_wrap new-item__skel_wrap">
      <div className="skeleton-box new-item__img-skel"></div>
      <div className="new-item__skel_info-wrap">
        <div className="skeleton-box new-item__name-skel"></div>
        <div className="new-item__skel_info-wrap2">
          <div className="skeleton-box new-item__price-skel"></div>
          <div className="skeleton-box new-item__like-skel"></div>
        </div>
      </div>
    </div>
  );
}
