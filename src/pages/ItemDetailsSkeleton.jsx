import React from 'react';
import './ItemDetailsSkeleton.css'; // We will create this CSS file next

const ItemDetailsSkeleton = () => {
  return (
    <div className="item-details-skeleton-wrapper">
      <div className="item-details-skeleton-image skeleton-box"></div>
      <div className="item-details-skeleton-info">
        <div className="skeleton-box skeleton-title"></div>
        <div className="item-details-skeleton-counts">
          <div className="skeleton-box skeleton-views"></div>
          <div className="skeleton-box skeleton-likes"></div>
        </div>
        <div className="skeleton-box skeleton-description-line"></div>
        <div className="skeleton-box skeleton-description-line"></div>
        <div className="skeleton-box skeleton-description-line short"></div>

        <div className="item-details-skeleton-author-section">
          <div className="skeleton-box skeleton-avatar"></div>
          <div className="skeleton-box skeleton-author-name"></div>
        </div>

         <div className="item-details-skeleton-creator-section">
          <div className="skeleton-box skeleton-avatar"></div>
          <div className="skeleton-box skeleton-author-name"></div>
        </div>

        <div className="skeleton-box skeleton-price"></div>
      </div>
    </div>
  );
};

export default ItemDetailsSkeleton;
