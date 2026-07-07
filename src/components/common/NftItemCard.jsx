import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const formatPrice = (price) => {
  const value = Number(price);
  if (Number.isNaN(value)) {
    return "0.00 ETH";
  }
  return `${value.toFixed(2)} ETH`;
};

const formatCountdown = (expiryDate) => {
  const target = Number(expiryDate);
  if (Number.isNaN(target)) {
    return "Expired";
  }

  const remainingMs = target - Date.now();
  if (remainingMs <= 0) {
    return "Expired";
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

const NftItemCard = ({
  item,
  variant = "grid",
  authorImage,
  enableAos = false,
  aosDelay = 0,
}) => {
  if (!item) {
    return null;
  }

  const nftPath =
    item.nftId !== undefined && item.nftId !== null && item.nftId !== ""
      ? `/item-details/${item.nftId}`
      : "/item-details";

  const authorPath =
    item.authorId !== undefined && item.authorId !== null && item.authorId !== ""
      ? `/author/${item.authorId}`
      : "/author";

  const stopInteraction = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const wrapperClass =
    variant === "authorProfile"
      ? "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      : "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12";

  const aosProps = enableAos
    ? {
        "data-aos": "fade-up",
        "data-aos-duration": "1000",
        "data-aos-easing": "ease-out",
        ...(aosDelay > 0 ? { "data-aos-delay": String(aosDelay) } : {}),
      }
    : {};

  return (
    <div
      className={wrapperClass}
      style={{ display: "block", backgroundSize: "cover" }}
      {...aosProps}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <Link to={authorPath}>
            <img
              className="lazy"
              src={authorImage || item.authorImage || AuthorImage}
              alt={item.title || "Author"}
              onError={(event) => {
                event.currentTarget.src = AuthorImage;
              }}
            />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        <div className="de_countdown">{formatCountdown(item.expiryDate)}</div>

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button type="button" onClick={stopInteraction}>
                Buy Now
              </button>
            </div>
          </div>
          <Link to={nftPath} state={{ selectedItem: item }}>
            <img
              src={item.nftImage || nftImage}
              className="lazy nft__item_preview"
              alt={item.title || "NFT"}
              onError={(event) => {
                event.currentTarget.src = nftImage;
              }}
            />
          </Link>
        </div>

        <div className="nft__item_info">
          <Link to={nftPath} state={{ selectedItem: item }}>
            <h4>{item.title || "Untitled NFT"}</h4>
          </Link>
          <div className="nft__item_price">{formatPrice(item.price)}</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{Number.isFinite(Number(item.likes)) ? item.likes : 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftItemCard;
