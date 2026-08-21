import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Countdown from "../UI/Countdown";
import ItemShareButtons from "../UI/ItemShareButtons";
import { getExploreItems } from "../../api/nft";

const PAGE_SIZE = 8;
const LOAD_MORE_STEP = 4;

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    let cancelled = false;

    const fetchItems = async () => {
      setLoading(true);

      try {
        const data = await getExploreItems(filter);
        if (!cancelled) setItems(data);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchItems();

    return () => {
      cancelled = true;
    };
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  const visibleItems = items.slice(0, visibleCount);

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(PAGE_SIZE).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item skeleton-nft-item">
                <div className="skeleton skeleton-author"></div>
                <div className="skeleton skeleton-nft-image"></div>

                <div className="skeleton-nft-info">
                  <div className="skeleton skeleton-nft-title"></div>
                  <div className="skeleton skeleton-nft-price"></div>
                </div>
              </div>
            </div>
          ))
        : visibleItems.map((item) => (
            <div
              key={item.nftId}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="View author"
                  >
                    <img
                      className="lazy"
                      src={item.authorImage || AuthorImage}
                      alt="Author"
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <Countdown expiryDate={item.expiryDate} />

                <div className="nft__item_wrap">
                  <ItemShareButtons />

                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage || nftImage}
                      className="lazy nft__item_preview"
                      alt={item.title || "NFT"}
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>

                  <div className="nft__item_price">{item.price} ETH</div>

                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button
            type="button"
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
