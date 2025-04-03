import React from "react";
import Skeleton from "react-loading-skeleton";

const HotCollectionsSkeleton = () => {
  return (
    <div className="px-2">
      <div className="nft_coll" style={{ overflow: "hidden" }}>
        <div className="nft_wrap" style={{ margin: 0, padding: 0, lineHeight: 0 }}>
          <Skeleton
            height="125px"
            width="100%"
            style={{
              display: "block",
              margin: 0,
              padding: 0,
              borderRadius: "8px",
            }}
          />
        </div>
        <div className="nft_coll_pp">
          <Skeleton circle width={50} height={50} />
          <img className="lazy pp-coll" src="" alt="" />
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <h4>
            <Skeleton width={80}/>
          </h4>
          <span>
            <Skeleton width={40}/>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HotCollectionsSkeleton;