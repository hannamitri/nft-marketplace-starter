import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="container" id="section-collections">
      <div className="row">
        {[1, 2, 3, 4].map((index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <div className="nft_coll">
              <div className="nft_wrap skeleton-wrap">
                <div className="skeleton-img"></div>
              </div>
              <div className="nft_coll_pp">
                <div className="skeleton-avatar"></div>
              </div>
              <div className="nft_coll_info">
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
