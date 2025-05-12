import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ count = 8 }) => {
  const numberOfSkeletons = count;

  return (
    <div className="skeleton-wrapper">
      {Array(numberOfSkeletons).fill(0).map((_, index) => (
        <div className="skeleton-item" key={index}>
          <div className="skeleton-image animated-shimmer"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;