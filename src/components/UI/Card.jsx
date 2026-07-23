import React from "react";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";

const Card = ({
  authorImage,
  likes,
  nftImage,
  price,
  title,
  expiryDate,
  nftId,
  authorId,
}) => {
  return (
    <>
      <div key={nftId}>
        <div className="nft__item" key={nftId}>
          <div className="author_list_pp">
            <Link
              to={`/author/${authorId}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator: Monica Lucas"
            >
              <img className="lazy" src={authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <Countdown expiryDate={expiryDate} />
          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <button type="button">
                    <i className="fa fa-facebook fa-lg"></i>
                  </button>
                  <button type="button">
                    <i className="fa fa-twitter fa-lg"></i>
                  </button>
                  <button type="button">
                    <i className="fa fa-envelope fa-lg"></i>
                  </button>
                </div>
              </div>
            </div>

            <Link to={`/item-details/${nftId}`}>
              <img src={nftImage} className="lazy nft__item_preview" alt="" />
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
      </div>
    </>
  );
};

export default Card;
