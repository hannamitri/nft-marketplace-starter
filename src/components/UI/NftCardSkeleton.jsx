import React from "react";
import Skeleton from "./Skeleton";

const NftCardSkeleton = () => (
  <div className="nft__item">
    <div className="author_list_pp">
      <Skeleton width="50px" height="50px" borderRadius="50%" />
    </div>
    <div className="nft__item_wrap">
      <Skeleton width="100%" height="200px" borderRadius="8px" />
    </div>
    <div className="nft__item_info">
      <div><Skeleton width="70%" height="20px" /></div>
      <div><Skeleton width="40%" height="16px" /></div>
    </div>
  </div>
);

export default NftCardSkeleton;
