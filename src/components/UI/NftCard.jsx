import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const formatCountdown = (milliseconds) => {
  const days = Math.floor(milliseconds / 86400000);
  const hours = Math.floor((milliseconds % 86400000) / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);

  return `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m ${seconds}s`;
};

const getTimeLeft = (expiryDate) =>
  Math.max(Number(expiryDate) - Date.now(), 0);

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(expiryDate));

  useEffect(() => {
    if (!expiryDate) return undefined;

    const updateCountdown = () => setTimeLeft(getTimeLeft(expiryDate));
    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(intervalId);
  }, [expiryDate]);

  if (!expiryDate) return null;

  return (
    <div className="de_countdown" aria-live="off">
      {timeLeft > 0 ? formatCountdown(timeLeft) : "Expired"}
    </div>
  );
};

const NftCard = ({ item }) => {
  const authorId = item.authorId ?? item.ownerId;
  const authorImage = item.authorImage ?? item.ownerImage;
  const itemPath = `/item-details/${item.nftId}`;
  const authorPath = `/author/${authorId}`;

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={authorPath}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Author: ${item.ownerName || item.title}`}
        >
          <img className="lazy" src={authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      <Countdown expiryDate={item.expiryDate} />

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button type="button">Buy Now</button>
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

        <Link to={itemPath}>
          <img
            src={item.nftImage}
            className="lazy nft__item_preview"
            alt={item.title}
          />
        </Link>
      </div>

      <div className="nft__item_info">
        <Link to={itemPath}>
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

export default NftCard;
