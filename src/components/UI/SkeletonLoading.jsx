import React from 'react'
import Skeleton from './Skeleton'

function SkeletonLoading() {
  return (
    new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="nft__item_wrap">
              <Skeleton width="100%" height="400px" />
            </div>
          </div>
        </div>
      ))
  )
}

export default SkeletonLoading