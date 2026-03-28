import React from 'react';
import './CollectionCardSkeleton.css';


const CollectionCardSkeleton = () => {
  return (
    <div className="collection-card-skeleton">
      {/* Image Skeleton */}
      <div className="skeleton-image"></div>

      {/* Info Skeleton */}
      <div className="skeleton-info">
        {/* Avatar Skeleton */}
        <div className="skeleton-avatar"></div>

        {/* Title Skeleton */}
        <div className="skeleton-title"></div>

        {/* Code Skeleton */}
        <div className="skeleton-code"></div>
      </div>
    </div>
  );
};

export default CollectionCardSkeleton;