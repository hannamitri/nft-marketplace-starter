import React from 'react';
import Skeleton from './Skeleton';

const SkeletonLoader = () => {
  return (
    <div className="nft_coll">
      <div className="nft_wrap">
        <Skeleton width="100%" height="150px" borderRadius="10px" />
      </div>
      <div className="nft_coll_pp" style={{ position: 'relative', marginTop: '-30px',}}>
        <Skeleton width="60px" height="60px" borderRadius="50%" />
        <i className="fa fa-check"></i>
      </div>
      <div className="nft_coll_info" style={{ padding: '10px' }}>
        <Skeleton width="80%" height="20px" borderRadius="5px" />
        <Skeleton width="50%" height="15px" borderRadius="5px" style={{ marginTop: '10px' }} />
      </div>
    </div>
  );
};

export default SkeletonLoader;