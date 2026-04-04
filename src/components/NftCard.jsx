import React from "react";
import { Link } from "react-router-dom";
import Countdown from "./Countdown"; // adjust path as needed

// ─── Skeleton Card ─────────────────────────────────────────────────────────────
export const NftCardSkeleton = () => (
  <div className="nft__item">
    <div className="nft_coll_pp">
      <div className="skeleton-box"></div>
    </div>
    <div className="nft_wrap">
      <div className="skeleton-box"></div>
    </div>
    <div className="nft_coll_info">
      <div className="skeleton-box"></div>
      <div className="skeleton-box"></div>
    </div>
  </div>
);

/** Reusable NFT card component.
 *
 * Props:
 *  - nftId        {string|number}
 *  - nftImage     {string}
 *  - title        {string}
 *  - price        {number|string}
 *  - likes        {number}
 *  - authorId     {string|number}
 *  - authorImage  {string}
 *  - expiryDate   {number}        
 */
const NftCard = ({
  nftId,
  nftImage,
  title,
  price,
  likes,
  authorId,
  authorImage,
  expiryDate,
}) => (
  <div className="nft__item">
    {/* Author avatar */}
    <div className="author_list_pp">
      <Link
        to={`/author/${authorId}`}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={`Creator: ${authorId}`}
      >
        <img className="lazy" src={authorImage} alt="" />
        <i className="fa fa-check"></i>
      </Link>
    </div>

    {/* Optional countdown — only rendered when expiryDate is provided */}
    {expiryDate && <Countdown expiryDate={expiryDate} />}

    {/* NFT image */}
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
      <Link to={`/item-details/${nftId}`}>
        <img src={nftImage} className="lazy nft__item_preview" alt="" />
      </Link>
    </div>

    {/* Info row */}
    <div className="nft__item_info">
      <Link to={`/item-details/${nftId}`}>
        <h4>{title}</h4>
      </Link>
      <div className="nft__item_price">{price} ETH</div>
      <div className="nft__item_like">
        <i className="fa fa-heart"></i>
        <span>{likes}</span>
      </div>
    </div>
  </div>
);

export default NftCard;