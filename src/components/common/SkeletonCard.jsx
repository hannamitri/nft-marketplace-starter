import React from 'react';
import './SkeletonCard.css'; 

const SkeletonCard = () => {
  return (
    <div className="nft_coll">
      <div className="nft_wrap skeleton-box" />
      <div className="nft_coll_pp skeleton-box round" />
      <div className="nft_coll_info">
        <div className="skeleton-box text-line short" />
        <div className="skeleton-box text-line" />
      </div>
    </div>
  );
};

export default SkeletonCard;

