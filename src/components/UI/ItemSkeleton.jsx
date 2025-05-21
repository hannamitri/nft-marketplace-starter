import React from "react";

const ItemSkeleton = () => {
  return (
    <div className="item col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item">
        <div className="author_list_pp">
          <div className="skeleton skeleton-img-circle"></div>
        </div>
        <div className="de_countdown skeleton skeleton-text"></div>
        <div className="nft__item_wrap">
          <div className="skeleton skeleton-img"></div>
        </div>
        <div className="nft__item_info">
          <div className="skeleton skeleton-text title"></div>
          <div className="price-likes">
            <div className="skeleton skeleton-text price"></div>
            <div className="skeleton skeleton-text likes"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSkeleton;
