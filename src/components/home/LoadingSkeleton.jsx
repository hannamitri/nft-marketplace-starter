import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ count = 8 }) => {
  const numberOfSkeletons = count;

  return (
    <div className="skeleton-wrapper">
      {Array(numberOfSkeletons).fill(0).map((_, index) => (
        <div className="skeleton-item" key={index}>
          <div className="skeleton-top-area">
              <div className="skeleton-author-image animated-shimmer"></div>
          </div>

          <div className="skeleton-image animated-shimmer"></div>

          <div className="skeleton-bottom-area">
              <div className="skeleton-text-line animated-shimmer" style={{ width: '70%' }}></div>
              <div className="skeleton-text-line animated-shimmer" style={{ width: '40%' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;