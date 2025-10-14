// src/components/explore/ExploreItems.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImageFallback from "../../images/author_thumbnail.jpg";
import NftImageFallback from "../../images/nftImage.jpg";
import Countdown from "../common/Countdown";

// ---------- helpers ----------
const toNumber = (val) => {
  if (typeof val === "number") return val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[^\d.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
};

const getPrice = (item) =>
  item?.price ??
  item?.priceEth ??
  item?.current_price ??
  item?.lastSalePrice ??
  0;

const getLikes = (item) =>
  item?.likes ?? item?.likeCount ?? item?.favorites ?? 0;

const getId = (item, idx) => item?.id ?? item?.nftId ?? idx;
const getAuthorId = (item) => item?.authorId ?? null;
const getAuthorImg = (item) => item?.authorImage || AuthorImageFallback;
const getNftId = (item) => item?.nftId ?? item?.id ?? null;
const getNftImg = (item) => item?.nftImage || item?.image || NftImageFallback;

const getTitle = (item) =>
  item?.title || item?.name || `NFT #${getNftId(item) ?? ""}`;

// normalize API date formats → milliseconds (Countdown expects ms)
const toMs = (raw) => {
  if (!raw) return null;
  if (typeof raw === "number") return raw < 1e12 ? raw * 1000 : raw; // seconds → ms
  if (typeof raw === "string") {
    const t = new Date(raw).getTime();
    return Number.isFinite(t) ? t : null;
  }
  return null;
};

// choose end-time field(s) for Explore (match New Items priority first)
const getEndMs = (item) =>
  toMs(
    item?.expiryDate ?? 
      item?.endTime ??
      item?.endsAt ??
      item?.deadline ??
      item?.ending_time ??
      item?.end
  );

// ---------- component ----------
const ExploreItems = ({ items = [], onLoadMore, hasMore }) => {
  const [filter, setFilter] = useState("");

  const sorted = useMemo(() => {
    const copy = [...items];
    switch (filter) {
      case "price_low_to_high":
        return copy.sort(
          (a, b) => toNumber(getPrice(a)) - toNumber(getPrice(b))
        );
      case "price_high_to_low":
        return copy.sort(
          (a, b) => toNumber(getPrice(b)) - toNumber(getPrice(a))
        );
      case "likes_high_to_low":
        return copy.sort(
          (a, b) => toNumber(getLikes(b)) - toNumber(getLikes(a))
        );
      default:
        return copy;
    }
  }, [items, filter]);

  if (!sorted.length) {
    return (
      <>
        <div className="col-12 mb-3">
          <select
            id="filter-items"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
        <div className="col-12 text-center py-5">No items found.</div>
      </>
    );
  }

  return (
    <>
      <div className="col-12 mb-3">
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {sorted.map((item, index) => {
        const key = getId(item, index);
        const authorImg = getAuthorImg(item);
        const nftImg = getNftImg(item);
        const title = getTitle(item);
        const price = getPrice(item);
        const likes = getLikes(item);

        const authorHref = getAuthorId(item)
          ? `/author/${getAuthorId(item)}`
          : "/author";
        const itemHref = getNftId(item)
          ? `/item-details/${getNftId(item)}`
          : "/item-details";

        const endMs = getEndMs(item);

        return (
          <div
            key={key}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={authorHref}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={authorImg} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              {/* countdown pill */}
              {endMs ? <Countdown end={endMs} /> : null}

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
                <Link to={itemHref}>
                  <img
                    src={nftImg}
                    className="lazy nft__item_preview"
                    alt={title}
                  />
                </Link>
              </div>

              <div className="nft__item_info">
                <Link to={itemHref}>
                  <h4>{title}</h4>
                </Link>

                <div className="nft__item_price">
                  {toNumber(price) ? `${price} ETH` : "—"}
                </div>

                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{toNumber(likes)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="col-md-12 text-center">
        <button
          id="loadmore"
          className="btn-main lead"
          onClick={onLoadMore}
          disabled={!onLoadMore || !hasMore}
        >
          {hasMore ? "Load more" : "No more items"}
        </button>
      </div>
    </>
  );
};

export default ExploreItems;