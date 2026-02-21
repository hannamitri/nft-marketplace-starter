import React from 'react';
import './NewItemCardSkeleton.css';


const NewItemCardSkeleton = () => {
  return (
    <div className="new-item-card-skeleton">
      {/* Countdown Skeleton */}
      <div className="skeleton-countdown"></div>

      {/* Image Skeleton */}
      <div className="skeleton-image"></div>

      {/* Info Skeleton */}
      <div className="skeleton-info">
        {/* Avatar Skeleton */}
        <div className="skeleton-avatar"></div>

        {/* Title Skeleton */}
        <div className="skeleton-title"></div>

        {/* Meta Skeleton (Price and Likes) */}
        <div className="skeleton-meta">
          <div className="skeleton-price"></div>
          <div className="skeleton-likes"></div>
        </div>
      </div>
    </div>
  );
};

export default NewItemCardSkeleton;