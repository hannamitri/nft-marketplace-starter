import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRemainingTime } from "../../utils/countdown";

const ExploreItemCard = ({ item }) => {
  const [timeLeft, setTimeLeft] = useState(
    getRemainingTime(item.expiryDate || item.expiry_date)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime(item.expiryDate || item.expiry_date));
    }, 1000);

    return () => clearInterval(interval);
  }, [item.expiryDate, item.expiry_date]);

  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
      <div className="nft__item">
        
        {/* Author */}
        <div className="author_list_pp">
          <Link to={`/author/${item.authorId || item.author_id}`}>
            <img
              className="lazy"
              src={item.authorImage || item.author_image}
              alt=""
            />
          </Link>
        </div>

        {/* Countdown */}
        <div className="de_countdown">
          {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>

        {/* NFT Image */}
        <div className="nft__item_wrap">
          <Link to={`/item-details/${item.nftId || item.nft_id}`}>
            <img
              src={item.nftImage || item.nft_image}
              className="lazy nft__item_preview"
              alt={item.title}
            />
          </Link>
        </div>

        {/* Info */}
        <div className="nft__item_info">
          <Link to={`/item-details/${item.nftId || item.nft_id}`}>
            <h4>{item.title}</h4>
          </Link>

          <div className="nft__item_price">
            {item.price} ETH
          </div>

          <div className="nft__item_like">
            <i className="fa fa-heart"></i> {item.likes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreItemCard;

