import React from "react";

const NewItemsSkeleton = () => {
  return (
    <div className="keen-slider__slide">
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
    <div className="nft__item skeleton skeleton-item">
      <div className="skeleton skeleton-avatar"></div>

      <div className="skeleton skeleton-image"></div>

      <div className="nft__item_info">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-price"></div>
      </div>
    </div>
  </div>
    </div>
  );
};

export default NewItemsSkeleton;