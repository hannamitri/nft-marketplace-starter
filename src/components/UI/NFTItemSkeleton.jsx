import React from "react";

import Skeleton from "./Skeleton";

const NFTItemSkeleton = () => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <div>
                <i className="fa fa-facebook fa-lg"></i>
              </div>
              <div>
                <i className="fa fa-twitter fa-lg"></i>
              </div>
              <div>
                <i className="fa fa-envelope fa-lg"></i>
              </div>
            </div>
          </div>
        </div>

        <Skeleton width="100%" height="350px" />
      </div>
      <div className="nft__item_info">
        <Skeleton width="180px" height="30px" />

        <Skeleton width="100px" height="20px" />
      </div>
      <div className="nft__item_like">
        <Skeleton width="30px" height="15px" />
      </div>
    </div>
  );
};

export default NFTItemSkeleton;
