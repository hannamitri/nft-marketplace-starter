import React from "react";
import Skeleton from "./Skeleton";

const HotSkeleton = () => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft_coll">
        <div className="nft_wrap">
          <Skeleton
            width={400}
            height={400}
            borderRadius={0}
          ></Skeleton>
        </div>
        <div className="nft_coll_pp">
          <Skeleton
            width={60}
            height={60}
            borderRadius={9999}
          />
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
            <div className='skeleton-title'>
                <Skeleton
                    width={125}
                    height={20}
                    borderRadius={4} />
            </div>
          <Skeleton
          width={75}
          height={20}
          borderRadius={4} />
        </div>
      </div>
    </div>
  );
};

export default HotSkeleton;
