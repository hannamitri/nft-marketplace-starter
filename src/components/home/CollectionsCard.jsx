import React from 'react';
import PropTypes from 'prop-types';
import './CollectionsCard.css';


const CollectionCard = ({ 
  id, 
  title, 
  nftImage, 
  authorImage, 
  code, 
  authorId, 
  nftId 
}) => {
  return (
    <div className="collection-card">
      {/* NFT Image */}
      <div className="collection-image-container">
        <img 
          src={nftImage} 
          alt={title}
          className="collection-image"
          loading="lazy"
        />
      </div>
      
      {/* Card Info */}
      <div className="collection-info">
        {/* Author Avatar with Badge */}
        <div className="collection-author">
          <img 
            src={authorImage} 
            alt={`Author ${authorId}`}
            className="author-avatar"
            loading="lazy"
          />
          <div className="verified-badge">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        
        {/* Collection Title */}
        <h3 className="collection-title">{title}</h3>
        
        {/* ERC Code */}
        <p className="collection-code">ERC-{code}</p>
      </div>
    </div>
  );
};

CollectionCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  nftImage: PropTypes.string.isRequired,
  authorImage: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
  authorId: PropTypes.number.isRequired,
  nftId: PropTypes.number.isRequired,
};

export default CollectionCard;