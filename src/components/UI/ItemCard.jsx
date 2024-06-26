import React from "react";
import Timer from "../home/Timer";
import { Link } from "react-router-dom";

export default function ItemCard({
  id,
  authorImage,
  expiryDate,
  nftImage,
  title,
  price,
  likes,
  onExplorePage,
  authorId,
}) {
  return (
    <div
      className={
        onExplorePage
          ? "new-item__card d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          : "new-item__card"
      }
      key={id}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          {authorId ? (
            <Link
              to={`/author/${authorId}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator: Monica Lucas"
            >
              <img className="lazy" src={authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          ) : (
            <Link
              to=""
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator: Monica Lucas"
            >
              <img className="lazy" src={authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          )}
        </div>

        {expiryDate ? (
          <div className="de_countdown">
            <Timer expiryTime={expiryDate} />
          </div>
        ) : (
          <></>
        )}

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="/" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="/" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="/">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <Link to="/item-details">
            <img src={nftImage} className="lazy nft__item_preview" alt="" />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to="/item-details">
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
  );
}
