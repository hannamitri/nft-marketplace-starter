import React from 'react';
import './LoadingSkeleton.css'; // Create this CSS file

const LoadingSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      {Array(4).fill(0).map((_, index) => ( // Render a few skeleton items
        <div className="skeleton-item" key={index}>
          <div className="skeleton-image animated-shimmer"></div>
          <div className="skeleton-author-image animated-shimmer"></div>
          <div className="skeleton-title animated-shimmer"></div>
          <div className="skeleton-erc animated-shimmer"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;