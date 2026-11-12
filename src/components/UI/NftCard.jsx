import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../home/NewItems.css";

// Convert the API response into an array.
export function extractItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
}

// Calculate the time remaining until expiration.
function getTimeLeft(expirationDate, now) {
  if (!expirationDate) return null;

  let expires;

  if (typeof expirationDate === "number") {
    expires = expirationDate < 1e12 ? expirationDate * 1000 : expirationDate;
  } else {
    expires = new Date(expirationDate).getTime();
  }

  if (!Number.isFinite(expires)) return null;

  const difference = Math.max(0, expires - now);
  const totalSeconds = Math.floor(difference / 1000);

  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: difference === 0,
  };
}

export function Countdown({ expirationDate }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const time = getTimeLeft(expirationDate, now);

  if (!time) {
    return <div className="de_countdown">No end date</div>;
  }

  if (time.expired) {
    return <div className="de_countdown">Expired</div>;
  }

  const pad = (number) => String(number).padStart(2, "0");

  return (
    <div className="de_countdown" aria-label="Time remaining">
      {pad(time.hours)}h {pad(time.minutes)}m {pad(time.seconds)}s
    </div>
  );
}

export function NewItemCard({ item }) {
  const nftId = item.nftId ?? item.nftID ?? item.nftid ?? item.id;
  const nftImage = item.nftImage ?? item.nftimage ?? item.image;
  const authorImage =
    item.authorImage ?? item.authorimage ?? item.author?.image;

  const title = item.title ?? item.name ?? "Untitled NFT";
  const price = item.price ?? item.ethPrice;
  const likes = item.likes ?? item.likeCount ?? 0;
  const expirationDate =
    item.expirationDate ??
    item.expiryDate ??
    item.expiration ??
    item.expiry ??
    item.expiresAt ??
    item.expDate ??
    item.expiration_time;

  const nftPath =
    nftId == null
      ? "/item-details"
      : `/line-detail/${encodeURIComponent(nftId)}`;
  const authorId = item.authorId ?? item.authorID ?? item.author?.id;
  const authorPath =
    authorId == null ? "/author" : `/author/${encodeURIComponent(authorId)}`;

  return (
    <article className="nft__item ni-card">
      <div className="author_list_pp">
        <Link to={authorPath} title="View author profile">
          {authorImage && (
            <img
              className="lazy"
              src={authorImage}
              alt={`${title} creator`}
              loading="lazy"
            />
          )}
          <i className="fa fa-check" aria-hidden="true" />
        </Link>
      </div>

      <Countdown expirationDate={expirationDate} />

      <div className="nft__item_wrap">
        <Link to={nftPath}>
          {nftImage && (
            <img
              src={nftImage}
              className="lazy nft__item_preview"
              alt={title}
              loading="lazy"
            />
          )}
        </Link>
      </div>

      <div className="nft__item_info">
        <Link to={nftPath}>
          <h4>{title}</h4>
        </Link>

        <div className="nft__item_price">
          {price != null ? `${price} ETH` : "Price unavailable"}
        </div>

        <div className="nft__item_like">
          <i className="fa fa-heart" aria-hidden="true" />
          <span>{likes}</span>
        </div>
      </div>
    </article>
  );
}

export function NewItemsSkeleton({ count = 4 }) {
  return (
    <div
      className="ni-skeleton-grid"
      role="status"
      aria-label="Loading new NFT items"
    >
      {Array.from({ length: count }, (_, index) => (
        <div className="ni-skeleton-card" key={index}>
          <div className="ni-shimmer ni-skeleton-avatar" />
          <div className="ni-shimmer ni-skeleton-image" />
          <div className="ni-shimmer ni-skeleton-title" />
          <div className="ni-shimmer ni-skeleton-price" />
        </div>
      ))}
    </div>
  );
}
