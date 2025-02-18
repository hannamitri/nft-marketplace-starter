import React from "react";
import CountdownTimer from "./CountdownTimer";
import { Link } from "react-router-dom";

const ItemCard = ({ item, index, dp }) => {
  return (
    <div className="nft__item gap">
      <div className="author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          <img className="lazy" src={item.authorImage || dp} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      <CountdownTimer expiryDate={item.expiryDate} />

      <div className="nft__item_wrap">
        <Link to="/item-details">
          <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to="/item-details">
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;