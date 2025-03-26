import React from "react";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";

const NewItemCard = ({ nft, item, authorImage, authorId}) => {
  const displayItem = nft || item;

  return (
    <div className="nft__item" key={displayItem.id}>
      <div className="author_list_pp">
          <Link to={`/author/${displayItem.authorId || authorId}`}>
            <img
              className="lazy"
              src={displayItem.authorImage || authorImage}
              alt=""
            />
            <i className="fa fa-check"></i>
          </Link>
      </div>
      {item && item.expiryDate > Date.now() && (
        <Countdown expiryDate={item.expiryDate} />
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
        <Link to={`/item-details/${displayItem.nftId}`}>
          <img
            src={displayItem.nftImage}
            className="lazy nft__item_preview"
            alt={displayItem.title}
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${displayItem.nftId}`}>
          <h4>{displayItem.title}</h4>
        </Link>
        <div className="nft__item_price">{displayItem.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{displayItem.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NewItemCard;