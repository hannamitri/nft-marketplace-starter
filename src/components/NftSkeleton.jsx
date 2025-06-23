import React from "react";
import Skeleton from "./UI/Skeleton";

function NftSkeleton({ className }) {
  return (
    <div className={className}>
      <div className="nft__item">
        <div style={{ height: "350px" }}>
          <Skeleton width="50px" height="50px" borderRadius="50%" />
          <Skeleton
            width="115px"
            height="32px"
            margin="0px 0px 10px 45px"
            borderRadius="8px"
          />
          <Skeleton
            width="213px"
            height="213px"
            borderRadius="8px"
            marginTop="16px"
          />
        </div>
        <div className="nft__item_info">
          <Skeleton width="150px" className="skeleton-box" />
          <br />
          <Skeleton width="100px" className="skeleton-box" />
        </div>
      </div>
    </div>
  );
}

export default NftSkeleton;
