import React from "react";
import Skeleton from "./Skeleton";

const NewItemSkeleton = () => {
  return (
    
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div className="nft__item">
          <div className="author_list_pp">
              <Skeleton width={50} height={50} borderRadius={9999} />
          </div>
          <div className="nft__item-wrap">
            <div className="nft__item-extra">
                <Skeleton width={260} height={339} borderRadius={12} />
            </div>
          </div>
        <div className="nft__item_info">
          <Skeleton width={100} height={16} borderRadius={4} />
          <div className="nft__item_price">
            <Skeleton width={70} height={16} borderRadius={4} />
          </div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span><Skeleton width={25} height={12} borderRadius={4} /></span>
          </div>
        </div>
        </div>
      </div>
  );
};

export default NewItemSkeleton;
