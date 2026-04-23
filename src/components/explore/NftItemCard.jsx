import React from "react";
import { Link } from "react-router-dom";
import { useCountdown } from "../../hooks/useCountdown";

function formatPriceEth(price) {
  const n = Number(price);
  if (!Number.isFinite(n)) return "— ETH";
  return `${n.toFixed(2)} ETH`;
}

const NftItemCard = ({
  authorImage,
  nftImage,
  title,
  price,
  likes,
  expiryDate,
  nftId,
  authorId,
}) => {
  const countdownLabel = useCountdown(expiryDate);
  const authorLink = `/author?authorId=${encodeURIComponent(authorId)}`;
  const itemLink = `/item-details?nftId=${encodeURIComponent(nftId)}`;
  const priceText = formatPriceEth(price);

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={authorLink}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        >
          <img className="lazy" src={authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="de_countdown">{countdownLabel}</div>

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
        <Link to={itemLink}>
          <img
            src={nftImage}
            className="lazy nft__item_preview"
            alt={title || "NFT preview"}
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={itemLink}>
          <h4>{title}</h4>
        </Link>
        <div className="nft__item_price">{priceText}</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NftItemCard;
