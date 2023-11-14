import React from 'react'
import Skeleton from 'react-loading-skeleton';

function SkeletonCard() {
  return (
    <div>
      {new Array(4).fill(0).map((_, index) => (
        <div
          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
          key={index}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Skeleton
                width={`50px`}
                height={`50px`}
                borderRadius={`50%`}
              />
            </div>
            <div className="nft__item_wrap">
              <Skeleton
                width={`100%`}
                height={`320px`}
                borderRadius={`50px`}
              />
            </div>
            <div className="nft__item_info">
              <Skeleton width={`90px`} height={`20px`} />
              <div className="nft__item_price">
                <Skeleton width={`75px`} height={`20px`} />
              </div>
              <div className="nft__item_like">
                <Skeleton width={`50px`} height={`20px`} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default SkeletonCard