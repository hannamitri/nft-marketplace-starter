import React from "react";
import Skeleton from "react-loading-skeleton";

const TopSellersSkeleton = () => {
  return (
    <li>
      <div className="author_list_pp">
        <Skeleton
          circle
          width={50}
          height={50}
          style={{
            margin: 0,
            padding: 0,
          }}
        />
        <i className="fa fa-check"></i>
      </div>
      <div className="author_list_info">
        <Skeleton
          width={100}
          height={21}
          style={{
            margin: 0,
            padding: 0,
          }}
        />
        <span>
          <Skeleton
            width={50}
            height={17}
            style={{
              margin: 0,
              padding: 0,
            }}
          />
        </span>
      </div>
    </li>
  );
};

export default TopSellersSkeleton;
