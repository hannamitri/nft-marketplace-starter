import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ExploreItems.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const PAGE_SIZE = 8; // items shown first
const LOAD_MORE_STEP = 4; // items added per "Load more" click

const COLUMN_CLASS = "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12";

const pad = (n) => String(n).padStart(2, "0");

const formatRemaining = (ms) => {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}h ${pad(m)}m ${pad(s)}s`;
};

// Live countdown. Ticks on its own so only this element re-renders.
const Countdown = ({ expiryDate }) => {
  const [remaining, setRemaining] = useState(() => expiryDate - Date.now());

  useEffect(() => {
    const tick = () => setRemaining(expiryDate - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiryDate]);

  if (!expiryDate) return null;

  return (
    <div className="de_countdown ei-countdown">
      {remaining > 0 ? formatRemaining(remaining) : "Ended"}
    </div>
  );
};

const SkeletonCard = () => (
  <div className={COLUMN_CLASS} style={{ display: "block" }}>
    <div className="nft__item ei-skeleton">
      <div className="ei-skeleton__img" />
      <span className="ei-skeleton__line" />
      <span className="ei-skeleton__line ei-skeleton__line--short" />
    </div>
  </div>
);

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch on first load and again every time the filter changes.
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    setVisible(PAGE_SIZE);

    const url = filter ? `${API_URL}?filter=${filter}` : API_URL;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });

    // Cancels the old request if the filter changes mid-load.
    return () => controller.abort();
  }, [filter]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Sort items"
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {error && (
        <p className="text-center ei-error">
          Items didn’t load. Refresh the page to try again.
        </p>
      )}

      {loading &&
        Array.from({ length: PAGE_SIZE }, (_, i) => <SkeletonCard key={i} />)}

      {!loading &&
        !error &&
        items.slice(0, visible).map((item, index) => (
          <div
            key={item.id}
            className={COLUMN_CLASS}
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div
              className="nft__item"
              data-aos="fade-up"
              data-aos-delay={(index % 4) * 100}
            >
              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`}>
                  <img
                    className="lazy"
                    src={item.authorImage}
                    alt={`Author of ${item.title}`}
                    loading="lazy"
                  />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              <Countdown expiryDate={item.expiryDate} />

              <div className="nft__item_wrap">
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt={item.title}
                    loading="lazy"
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

      {!loading && !error && visible < items.length && (
        <div className="col-md-12 text-center">
          <button
            type="button"
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisible((v) => v + LOAD_MORE_STEP)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
