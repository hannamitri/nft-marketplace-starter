import React from 'react'
import Skeleton from './UI/Skeleton'

const SkeletonCard = () => {
  return (
    <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
      <div className='nft_coll'>
        <div className='nft_wrap'>
          <Skeleton width='100%' height='200px' borderRadius='10px' />
        </div>
        <div className='nft_coll_pp'>
          <Skeleton width='50px' height='50px' borderRadius='50%' />
        </div>
        <div className='nft_coll_info mt-3'>
          <Skeleton width='80px' height='20px' borderRadius='4px' />
          <br />
          <Skeleton width='40px' height='16px' borderRadius='4px' />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard
