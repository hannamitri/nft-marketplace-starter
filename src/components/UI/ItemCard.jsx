import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

export function validItem(item) {
  return item &&
    Number.isFinite(item.id) && Number.isFinite(item.authorId) &&
    Number.isFinite(item.nftId) &&
    typeof item.title === "string" && item.title.trim() &&
    typeof item.authorImage === "string" && item.authorImage.trim() &&
    typeof item.nftImage === "string" && item.nftImage.trim() &&
    Number.isFinite(item.price) && item.price >= 0 &&
    Number.isFinite(item.likes) && item.likes >= 0 &&
    (item.expiryDate === null || Number.isFinite(item.expiryDate));
}

export function Countdown({ expiryDate, now }) {
  const remaining = Math.max(0, Math.ceil((expiryDate - now) / 1000));
  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  return (
    <div className="de_countdown" aria-label={`Time remaining: ${hours} hours ${minutes} minutes ${seconds} seconds`}>
      {hours}h {minutes}m {seconds}s
    </div>
  );
}

export function ItemCardSkeleton() {
  return (
    <div className="nft__item">
      <div className="author_list_pp"><Skeleton width="50px" height="50px" borderRadius="50%" /></div>
      <div className="nft__item_wrap"><Skeleton width="100%" height="260px" borderRadius="8px" /></div>
      <Skeleton width="75%" height="20px" borderRadius="4px" />
      <div style={{ marginTop: "10px" }}><Skeleton width="45%" height="16px" borderRadius="4px" /></div>
    </div>
  );
}

export default function ItemCard({ item, now }) {
  return (
    <article className="nft__item" aria-label={item.title}>
      <div className="author_list_pp">
        <Link to={`/author?authorId=${item.authorId}`} aria-label={`View creator of ${item.title}`}>
          <img className="lazy" src={item.authorImage} alt="" />
          <i className="fa fa-check" aria-hidden="true"></i>
        </Link>
      </div>
      {item.expiryDate !== null && <Countdown expiryDate={item.expiryDate} now={now} />}
      <div className="nft__item_wrap">
        <Link to={`/item-details?nftId=${item.nftId}`}>
          <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details?nftId=${item.nftId}`}><h4>{item.title}</h4></Link>
        <div className="nft__item_price">{item.price} ETH</div>
        <div className="nft__item_like" aria-label={`${item.likes} likes`}>
          <i className="fa fa-heart" aria-hidden="true"></i><span>{item.likes}</span>
        </div>
      </div>
    </article>
  );
}
