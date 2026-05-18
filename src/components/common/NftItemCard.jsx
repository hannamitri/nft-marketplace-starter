import React from "react";
import { Link } from "react-router-dom";
import { useCountdown } from "../../hooks/useCountdown";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const formatPrice = (price) => {
  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice)) {
    return "0.00 ETH";
  }
  return `${numericPrice.toFixed(2)} ETH`;
};

const stopCardNavigation = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

/**
 * @param {object} props
 * @param {object} props.item — Explore row or author collection NFT shape
 * @param {string} props.columnClassName
 * @param {object} [props.columnStyle]
 * @param {"explore" | "authorProfile"} [props.variant] — whole card → `/item-details/:nftId` when nftId exists, else `/author/:authorId` (explore) or `/item-details` (authorProfile fallback).
 */
const NftItemCard = ({
  item,
  columnClassName,
  columnStyle,
  variant = "explore",
}) => {
  const isAuthorProfile = variant === "authorProfile";
  const nftTitle = item.title || "Untitled NFT";
  const nftPrice = formatPrice(item.price);
  const likes = Number.isFinite(Number(item.likes)) ? Number(item.likes) : 0;
  const authorImage = item.authorImage || AuthorImage;
  const previewImage = item.nftImage || nftImage;
  const countdownText = useCountdown(item.expiryDate);

  const authorPath =
    item.authorId !== undefined && item.authorId !== null && item.authorId !== ""
      ? `/author/${item.authorId}`
      : "/author";

  const hasNftId =
    item.nftId !== undefined && item.nftId !== null && item.nftId !== "";
  const itemDetailsPath = hasNftId ? `/item-details/${item.nftId}` : "/item-details";

  const cardTo = hasNftId
    ? itemDetailsPath
    : isAuthorProfile
      ? "/item-details"
      : authorPath;

  return (
    <div className={columnClassName} style={columnStyle}>
      <Link
        to={cardTo}
        state={{ selectedItem: item }}
        className="nft-item-card__root d-block text-decoration-none"
      >
        <div className="nft__item">
          <div className="author_list_pp">
            <span data-bs-toggle="tooltip" data-bs-placement="top">
              <img className="lazy" src={authorImage} alt="Author avatar" />
              <i className="fa fa-check"></i>
            </span>
          </div>
          {!isAuthorProfile && (
            <div className="de_countdown">{countdownText}</div>
          )}

          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button type="button" onClick={stopCardNavigation}>
                  Buy Now
                </button>
                <div className="nft__item_share" onClick={stopCardNavigation}>
                  <h4>Share</h4>
                  <button type="button" onClick={stopCardNavigation}>
                    <i className="fa fa-facebook fa-lg"></i>
                  </button>
                  <button type="button" onClick={stopCardNavigation}>
                    <i className="fa fa-twitter fa-lg"></i>
                  </button>
                  <button type="button" onClick={stopCardNavigation}>
                    <i className="fa fa-envelope fa-lg"></i>
                  </button>
                </div>
              </div>
            </div>
            <span className="d-block">
              <img
                src={previewImage}
                className="lazy nft__item_preview"
                alt={nftTitle}
              />
            </span>
          </div>
          <div className="nft__item_info">
            <span className="d-block">
              <h4>{nftTitle}</h4>
            </span>
            <div className="nft__item_price">{nftPrice}</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NftItemCard;
