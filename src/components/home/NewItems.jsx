
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewItems.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

// Convert the API response into an array.
function extractItems(payload) {
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
    expires =
      expirationDate < 1e12
        ? expirationDate * 1000
        : expirationDate;
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

function Countdown({ expirationDate }) {
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
      {pad(time.hours)}h {pad(time.minutes)}m{" "}
      {pad(time.seconds)}s
    </div>
  );
}

function NewItemCard({ item }) {
  const nftId = item.nftId ?? item.nftID ?? item.nftid ?? item.id;
  const authorId = item.authorId ?? item.authorID ?? item.authorid;
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
    item.expiresAt;

  const nftPath =
    nftId == null
      ? "/item-details"
      : `/line-detail/${encodeURIComponent(nftId)}`;

  const authorPath =
    authorId == null
      ? "/author"
      : `/author/${encodeURIComponent(authorId)}`;

  return (
    <article className="nft__item ni-card">
      <div className="author_list_pp">
        <Link to={authorPath} title={`View creator of ${title}`}>
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

function NewItemsSkeleton() {
  return (
    <div
      className="ni-skeleton-grid"
      role="status"
      aria-label="Loading new NFT items"
    >
      {Array.from({ length: 4 }, (_, index) => (
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

export default function NewItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchItems() {
      const started = Date.now();

      try {
        const response = await axios.get(API_URL, {
          signal: controller.signal,
        });

        const results = extractItems(response.data);
        setItems(results.slice(0, 7));
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("Unable to load new items.");
        }
      } finally {
        const remaining = Math.max(
          0,
          2000 - (Date.now() - started)
        );

        await new Promise((resolve) =>
          setTimeout(resolve, remaining)
        );

        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchItems();

    return () => controller.abort();
  }, []);

  const settings = {
    dots: false,
    infinite: items.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: items.length > 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          infinite: items.length > 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom new-items">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2" />
            </div>
          </div>
        </div>

        {loading && <NewItemsSkeleton />}

        {!loading && error && (
          <p className="ni-status" role="alert">{error}</p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="ni-status">No new items available.</p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="ni-slider">
            <Slider {...settings}>
              {items.map((item) => (
                <div key={item.id} className="ni-slide">
                  <NewItemCard item={item} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
}
