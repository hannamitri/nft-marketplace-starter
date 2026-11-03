import React from "react";
import { Link, useParams } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import DynamicAuthorCard from "../DynamicAuthorCard";

const NFTItemCard = ({ item }) => {
  const authorId = item.authorId; // Extract the authorId from the item prop

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        {item.authorId && 
          <DynamicAuthorCard
                          className="lazy"
                          authorId={item.authorId}
                          data-bs-toggle="tooltip"
  data-bs-placement="top"
                        />
        }
         
      </div>

      <CountdownTimer expiryDate={item.expiryDate} />

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
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NFTItemCard;
