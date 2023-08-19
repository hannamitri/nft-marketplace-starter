import React from "react";
import { Link } from "react-router-dom";
import TimerLogic from "../functions/TimerLogic";

const UserCards = ({ newItemsUsersData }) => {
  return (
    <>
      {newItemsUsersData.map((user, index) => (
        // UserCards has different styling compared to AuthorCards & ExploreCards
        <div
          className="nft__item d-item col-lg-12 col-md-12 col-sm-6 col-xs-12"
          key={index}
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="author_list_pp">
            <Link
              to={`/author/${user.authorId}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={user.title}
            >
              <img className="lazy" src={user.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          {user.expiryDate ? (
            <div className="de_countdown">
              <div>
                <TimerLogic expiryDate={user.expiryDate} />
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

            <Link to={`/item-details/${user.nftId}`}>
              <img
                src={user.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
            </Link>
          </div>
          <div className="nft__item_info">
            <Link to="/item-details">
              <h4>{user.title}</h4>
            </Link>
            <div className="nft__item_price">{user.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{user.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserCards;
