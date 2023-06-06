import React from 'react'
import Skeleton from '../UI/Skeleton'


function TopSellerLoadingState() {
  return (
    <li>
      <div className="author_list_pp">
          <Skeleton className="lazy pp-author" width={50} height={50} borderRadius={'100%'}/>
          <i className="fa fa-check"></i>
      </div>
      <div className="author_list_info">
        <Skeleton height={20} width={'50%'}/>
        <span><Skeleton height={20} width={'25%'}/></span>
      </div>
    </li>
  )
}

export default TopSellerLoadingState
