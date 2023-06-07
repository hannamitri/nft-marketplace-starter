import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NewItem({ newItem }) {
  const [countdown, setCountdown] = useState(null);

  const calculateTime = () => {
    if (newItem.expiryDate !== null) {
      const time = newItem.expiryDate - Date.now();
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const seconds = Math.floor((time / 1000) % 60);

      setCountdown({hours: hours, minutes:minutes, seconds:seconds});
    }
  };

  useEffect(() => {
    calculateTime()
    const interval = setInterval(() => calculateTime(), 1000);
    return () => clearInterval(interval);
  },[]);

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${newItem.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          <img className="lazy" src={newItem.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {countdown !== null && (
        <div className="de_countdown">
          {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
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

        <Link to={`/item-details/${newItem.nftId}`}>
          <img
            src={newItem.nftImage}
            className="lazy nft__item_preview"
            alt=""
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${newItem.nftId}`}>
          <h4>{newItem.title}</h4>
        </Link>
        <div className="nft__item_price">{newItem.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{newItem.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default NewItem;
