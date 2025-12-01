import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Accepts cardData, onClick, and optionally extra children (like timer).
const DynamicCard = ({
  cardData,
  children, // For things like countdown timer!
  loading,
}) => {
  const navigate = useNavigate();

  if (loading) {
    // Skeleton for loading state
    return <div className="skeleton-card" />;
  }

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${cardData.authorId}`}
          title={`Creator: ${cardData.authorId}`}
        >
          <img
            className="lazy"
            src={cardData.authorImage}
            alt={`${cardData.authorId} avatar`}
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {children}

      <div className="nft__item_wrap">
        <Link to={`/item-details/${cardData.id}`}>
          <img
            src={cardData.nftImage}
            className="lazy nft__item_preview"
            alt={cardData.title}
            loading="lazy"
          />
        </Link>
      </div>

      <div className="nft__item_info">
        <Link to={`/item-details/${cardData.id}`}>
          <h4>{cardData.title}</h4>
        </Link>
        <div className="nft__item_price">{cardData.price} ETH</div>
        <div
          className="nft__item_like"
          onClick={() => navigate(`/item-details/${cardData.id}`)}
          style={{ cursor: "pointer" }}
        >
          <i className="fa fa-heart"></i>
          <span>{cardData.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default DynamicCard;
