import React from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "./UI/CountdownTimer";

const NFTCard = ({ nft }) => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${nft.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Creator: ${nft.author}`}
        >
          <img className="lazy" src={nft.authorImage} alt={nft.author} />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {nft.expiryDate && <CountdownTimer expiryDate={nft.expiryDate} />}

      <div className="nft__item_wrap">
        <Link to={`/item-details/${nft.id}`}>
          <img
            src={nft.nftImage}
            className="lazy nft__item_preview"
            alt={nft.title}
          />
        </Link>
      </div>

      <div className="nft__item_info">
        <Link to={`/item-details/${nft.id}`}>
          <h4>{nft.title}</h4>
        </Link>
        <div className="nft__item_price">{nft.price?.toFixed(2)} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{nft.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
