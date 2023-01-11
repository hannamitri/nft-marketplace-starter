import React from "react";
import Clock from "./Clock";
import { Link } from "react-router-dom";

export default function ExploreItem({
  authId,
  authImg,
  expire,
  likes,
  nftId,
  nftImg,
  price,
  title,
  classN,
  styleA,
}) {
  return (
    <div className={classN && classN} style={styleA && styleA}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={`/author/${authId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
          >
            <img className="lazy" src={authImg} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        {expire > 0 && (
          <div className="de_countdown">
            <Clock time={expire} />
          </div>
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
          <Link to={`/item-details/${nftId}`}>
            <img src={nftImg} className="lazy nft__item_preview" alt="" />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to={`/item-details/${nftId}`}>
            <h4>{title}</h4>
          </Link>
          <div className="nft__item_price">{`${price} ETH`}</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
