import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import CountdownTimer from "./CountdownTimer";

const DynamicCard = ({
  item,
  timerText = CountdownTimer({ expiryDate: item.expiryDate }),
  showPrice = true,
  showLike = true,
  minHeight = "420px",
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);
  return (
    <div
      className="nft__item"
      data-aos="fade-up"
      data-aos-delay="202"
      style={{ minHeight }}
    >
      <div className="author_list_pp">
        <Link
          to={`/author/${item.authorId}`}
          title={`Creator: ${item.authorId}`}
        >
          <img
            className="lazy"
            src={item.authorImage}
            alt={`${item.authorId} avatar`}
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {timerText && <div className="de_countdown">{timerText}</div>}
      <div className="nft__item_wrap">
        <Link to={`/item-details/${item.id}`}>
          <img
            src={item.nftImage}
            className="lazy nft__item_preview"
            alt={item.title}
            loading="lazy"
            style={{
              objectFit: "cover",
              maxHeight: "220px",
              borderRadius: "12px",
            }}
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.id}`}>
          <h4>{item.title}</h4>
        </Link>
        {showPrice && <div className="nft__item_price">{item.price} ETH</div>}
        {showLike && (
          <div
            className="nft__item_like"
            onClick={() => navigate(`/item-details/${item.id}`)}
            style={{ cursor: "pointer" }}
          >
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicCard;
