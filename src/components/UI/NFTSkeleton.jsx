import React from "react";
import Skeleton from "./Skeleton";

function NFTSkeleton() {
  return (
    <div className="nft__item">
      <div className="nft__item_wrap">
        <Skeleton width="100%" height="100%" borderRadius={5} />
      </div>
      <Skeleton width="80%" height={10} borderRadius={5} />
    </div>
  );
}

export default NFTSkeleton;
