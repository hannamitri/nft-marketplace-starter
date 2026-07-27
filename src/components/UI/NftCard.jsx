import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findAuthorById } from "../../data/marketplaceData";

const formatCountdown = (expiryDate) => {
  const remainingMs = expiryDate - Date.now();
  if (remainingMs <= 0) {
    return "EXPIRED";
  }

  const remainingSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};

const NftCard = ({ item }) => {
  const author = findAuthorById(item.ownerId);
  const [countdownLabel, setCountdownLabel] = useState(
    item.expiryDate ? formatCountdown(item.expiryDate) : item.countdown || ""
  );

  useEffect(() => {
    if (!item.expiryDate) {
      setCountdownLabel(item.countdown || "");
      return undefined;
    }

    const updateCountdown = () => {
      setCountdownLabel(formatCountdown(item.expiryDate));
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdownInterval);
  }, [item.countdown, item.expiryDate]);

  const shareTitle = encodeURIComponent(
    item.serialNumber ? `${item.title} #${item.serialNumber}` : item.title
  );
  const shareUrl = encodeURIComponent(`https://nft-marketplacee.web.app/item-details/${item.id}`);
  const cardAuthorImage = item.authorImage || author.image;

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${author.id}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={`Creator: ${author.name}`}
        >
          <img className="lazy" src={cardAuthorImage} alt={author.name} />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {countdownLabel ? <div className="de_countdown">{countdownLabel}</div> : null}

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button type="button">Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href={`mailto:?subject=${shareTitle}&body=${shareUrl}`}>
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <Link to={`/item-details/${item.id}`}>
          <img src={item.image} className="lazy nft__item_preview" alt={item.title} />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item.id}`}>
          <h4>{item.title}</h4>
        </Link>
        <div className="nft__item_price">{item.price.toFixed(2)} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NftCard;