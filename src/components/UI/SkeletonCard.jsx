import React from "react";

const SkeletonCard = () => {
  return (
    
      <div className="nft__item skeleton-card">
        <div className="skeleton skeleton-avatar" />
        <div className="skeleton skeleton-image" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text short" />
      </div>
   
  );
};

export default SkeletonCard;
