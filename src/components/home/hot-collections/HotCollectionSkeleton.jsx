import React from "react";
import Skeleton from "../../UI/Skeleton";


const CollectionSkeleton = () => {
  return (
    <div className="nft_coll">
      <div className="nft_wrap">
        <Skeleton width="100%" height="200px" borderRadius="10px" />
      </div>
      <div className="nft_coll_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>
      <div className="nft_coll_info">
        <Skeleton width="70%" height="16px" borderRadius="4px" />
        <Skeleton width="40%" height="14px" borderRadius="4px" />
      </div>
    </div>
  );
};

export default CollectionSkeleton;
