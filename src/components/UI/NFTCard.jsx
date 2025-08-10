import React from 'react';
import { Link } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';
import AuthorImage from '../../images/author_thumbnail.jpg';
import nftImage from '../../images/nftImage.jpg';

// Skeleton component for loading state
const NFTCardSkeleton = () => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <div className="skeleton-box" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
        <i className="fa fa-check"></i>
      </div>
      <div className="de_countdown">
        <div className="skeleton-box" style={{ width: '80px', height: '20px' }}></div>
      </div>
      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <div className="skeleton-box" style={{ width: '80px', height: '32px', borderRadius: '4px' }}></div>
            <div className="nft__item_share">
              <h4>Share</h4>
              <div className="skeleton-box" style={{ width: '20px', height: '20px', borderRadius: '50%', margin: '0 5px' }}></div>
              <div className="skeleton-box" style={{ width: '20px', height: '20px', borderRadius: '50%', margin: '0 5px' }}></div>
              <div className="skeleton-box" style={{ width: '20px', height: '20px', borderRadius: '50%', margin: '0 5px' }}></div>
            </div>
          </div>
        </div>
        <div className="skeleton-box" style={{ width: '100%', height: '300px', borderRadius: '8px' }}></div>
      </div>
      <div className="nft__item_info">
        <div className="skeleton-box" style={{ width: '80%', height: '20px', marginBottom: '8px' }}></div>
        <div className="skeleton-box" style={{ width: '60px', height: '16px', marginBottom: '8px' }}></div>
        <div className="skeleton-box" style={{ width: '40px', height: '14px' }}></div>
      </div>
    </div>
  );
};

const NFTCard = ({ nftData, loading = false }) => {
  if (loading) {
    return <NFTCardSkeleton />;
  }

  if (!nftData) {
    return null;
  }

  const handleImageError = (e) => {
    e.target.src = nftImage;
  };

  const handleAuthorImageError = (e) => {
    e.target.src = AuthorImage;
  };

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${nftData.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Creator: ${nftData.authorName || ''}`}
        >
          <img 
            className="lazy" 
            src={nftData.authorImage || AuthorImage} 
            alt={nftData.authorName || 'Author'} 
            onError={handleAuthorImageError}
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {/* Countdown Timer - only show if expiryDate exists */}
      {nftData.expiryDate && (
        <CountdownTimer expiryDate={nftData.expiryDate} />
      )}

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
                  <Link 
            to={`/item-details/${nftData.nftId}`}
          >
            <img 
              src={nftData.nftImage || nftImage} 
              className="lazy nft__item_preview" 
              alt={nftData.title || 'NFT'}
              onError={handleImageError}
            />
          </Link>
      </div>
      <div className="nft__item_info">
                  <Link 
            to={`/item-details/${nftData.nftId}`}
          >
            <h4>{nftData.title || ''}</h4>
          </Link>
        <div className="nft__item_price">{nftData.price || 0} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{nftData.likes || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
