import React from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";

const NewItemCard = ({ item }) => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Creator of ${item.title}`}
        >
          <img
            className="lazy"
            src={item.authorImage}
            alt={`${item.title} author`}
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}
      <div className="nft__item_wrap">
        <Link to={`/item-details/${item.nftId}`}>
          <img
            src={item.nftImage}
            className="lazy nft__item_preview"
            alt={item.title}
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.nftId}`}>
          <h4>{item.title}</h4>
        </Link>

        <div className="nft__item_price">
          {Number(item.price).toFixed(2)} ETH
        </div>

        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NewItemCard;
