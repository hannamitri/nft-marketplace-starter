import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";

const ItemCard = ({
  id,
  nftId,
  nftImage,
  title,
  price,
  likes,
  authorId,
  authorImage,
  expiryDate,
}) => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link to={`/author/${authorId}`}>
          <img className="lazy pp-author" src={authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      <Countdown expiryDate={expiryDate} />

      <div className="nft__item_wrap">
        <Link to={`/item-details/${nftId}`}>
          <img src={nftImage} className="lazy nft__item_preview" alt={title} />
        </Link>
      </div>

      <div className="nft__item_info">
        <Link to={`/item-details/${nftId}`}>
          <h4>{title}</h4>
        </Link>

        <div className="nft__item_price">{price} ETH</div>

        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
