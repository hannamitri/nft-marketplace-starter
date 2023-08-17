import React from "react";

const SkeletonLoading = ( { index } ) => {
  return (
    <>
      <div
        className="nft__item d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        key={index}
        style={{ display: "block", backgroundSize: "cover" }}
      >
        <div className="skeleton nft__coll--skeleton skeleton-style">
          <div className="skeleton-box nft__img--skeleton nft__newItem--position"></div>
          <div className="skeleton-box"></div>
        </div>
        <figure className="check--skeleton nft__newItem--pp--position">
          <i className="fa fa-check fa-check--skeleton nft__newItem--checkmark--position"></i>
        </figure>
        <div className="nft__detail--container">
          <div className="skeleton nft__name-skeleton skeleton-box"></div>
          <div className="skeleton nft__id--skeleton skeleton-box"></div>
          <div className="nft__detail--container-heart">
            <div className="skeleton-box heart--skeleton"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonLoading;
