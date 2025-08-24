import React from 'react'
import Skeleton from '../../UI/Skeleton'

export default function NewItemSkeleton() {
  return (
    <div className="px-1">
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton width="50px" height="50px" borderRadius="50%" />
        </div>
        <div className="de_countdown">
          <Skeleton width="100px" height="20px" borderRadius="4px" />
        </div>
        <div className="nft__item_wrap">
          <Skeleton width="100%" height="250px" borderRadius="10px" />
        </div>
        <div className="nft__item_info">
          <Skeleton width="70%" height="20px" borderRadius="4px" />
          <Skeleton width="40%" height="18px" borderRadius="4px" />
          <Skeleton width="30px" height="18px" borderRadius="4px" />
        </div>
      </div>
    </div>
  )
}
