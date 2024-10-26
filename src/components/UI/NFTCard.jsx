import React from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";

const NFTCard = ({authorId, authorImage, expiryDate, nftId, nftImage, title, price, likes, index, inSlider}) => {



  return (

    <div
          key={index}
          className={inSlider ? "" :"d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"}
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={"/author/" + authorId}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {expiryDate && <div className="de_countdown"><Countdown date={expiryDate} /></div>}

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
              <Link to={"/item-details/" + nftId}>
                <img src={nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={"/item-details/" + nftId}>
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
};

export default NFTCard;
