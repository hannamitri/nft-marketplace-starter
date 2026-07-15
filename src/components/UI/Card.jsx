import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Countdown({ expiryDate }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(function () {
      setNow(Date.now());
    }, 1000);

    return function () {
      clearInterval(interval);
    };
  }, []);

  if (!expiryDate) {
    return null;
  }

  const timeLeft = expiryDate - now;
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="de_countdown">
      {hours}h:{minutes}m:{seconds}s
    </div>
  );
}

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
    </>
  );
};

export default Card;
