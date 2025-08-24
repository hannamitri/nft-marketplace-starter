import React from "react";
import Skeleton from "../../UI/Skeleton";

const TopSellerSkeleton = () => {
  return (
    <li>
      <div className="author_list_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>
      <div className="author_list_info">
        <Skeleton
          width="120px"
          height="16px"
          borderRadius="4px"
          style={{ marginBottom: "6px" }}
        />
        <Skeleton width="60px" height="14px" borderRadius="4px" />
      </div>
    </li>
  );
};

export default TopSellerSkeleton;
