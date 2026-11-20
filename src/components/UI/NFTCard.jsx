import React from "react";
import { Link } from "react-router-dom";
import Countdown from "./countdown";

const NFTCard = ({ item, showShare = false }) => {
  const nftId = item.nftId || item.id;

  return (
    <div className="nft__item">

      {/* AUTHOR IMAGE */}
      <div className="author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          title="View Creator"
        >
          <img
            className="lazy"
            src={item.authorImage}
            alt="NFT Creator"
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {/* REUSABLE COUNTDOWN */}
      <Countdown expiryDate={item.expiryDate} />

      {/* NFT IMAGE */}
      <div className="nft__item_wrap">

        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button type="button">
              Buy Now
            </button>

            {/* SHARE BUTTONS FOR EXPLORE */}
            {showShare && (
              <div className="nft__item_share">
                <h4>Share</h4>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-facebook fa-lg"></i>
                </a>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-twitter fa-lg"></i>
                </a>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            )}
          </div>
        </div>

        <Link to={`/item-details/${nftId}`}>
          <img
            src={item.nftImage}
            className="lazy nft__item_preview"
            alt={item.title || "NFT"}
          />
        </Link>

      </div>

      {/* NFT INFORMATION */}
      <div className="nft__item_info">

        <Link to={`/item-details/${nftId}`}>
          <h4>{item.title}</h4>
        </Link>

        <div className="nft__item_price">
          {item.price} ETH
        </div>

        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>

      </div>

    </div>
  );
};

export default NFTCard;