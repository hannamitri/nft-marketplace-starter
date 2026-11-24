import React from "react";

const Skeleton = () => {
  return (
    <li className="top-seller-skeleton">
      <div className="seller-skeleton-avatar"></div>
      <div className="seller-skeleton-info">
        <div className="seller-skeleton-name"></div>
        <div className="seller-skeleton-price"></div>
      </div>
    </li>
  );
};

const SkeletonBox = ({ width, height, borderRadius }) => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div className="nft__item">
          <div className="skeleton-avatar skeleton-animation"></div>
          <div className="skeleton-image skeleton-animation"></div>

          <div className="nft__item_info">
            <div className="skeleton-title skeleton-animation"></div>
            <div className="skeleton-price skeleton-animation"></div>
          </div>
        </div>
      </div>
      <div
        className="skeleton-box"
        style={{
          width,
          height,
          borderRadius,
        }}
      ></div>
    </>
  );
};

export default Skeleton;
