import React from "react";

const ExploreSkeletton = () => {
  return (
    <div className="container" id="section-collections">
      <div className="row">
        {new Array(8).fill(0).map((index) => (
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

export default ExploreSkeletton;
