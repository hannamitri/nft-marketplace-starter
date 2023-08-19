import React from "react";
import { Link, useParams } from "react-router-dom";
import TimerLogic from "../functions/TimerLogic";

const AuthorCards = ({ usersData }) => {
  const { id } = useParams();
  return (
    <>
      {usersData.map((nftUser, index) => (
        <div
          className="nft__item d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          key={index}
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="author_list_pp">
            <a
              href={`/author/${id}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={nftUser.title}
            >
              <img
                className="lazy"
                src={nftUser.authorImage}
                alt={nftUser.authorImage}
              />
              <i className="fa fa-check"></i>
            </a>
          </div>
          {nftUser.expiryDate ? (
            <div className="de_countdown">
              <div>
                <TimerLogic expiryDate={nftUser.expiryDate} />
              </div>
            </div>
          ) : (
            <div className="de_countdown hidden__timer"></div>
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

            <Link to={`/item-details/${nftUser.nftId}`}>
              <img
                src={nftUser.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
            </Link>
          </div>
          <div className="nft__item_info">
            <Link to="/item-details">
              <h4>{nftUser.title}</h4>
            </Link>
            <div className="nft__item_price">{nftUser.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{nftUser.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AuthorCards;
