import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import AOS from "aos";

const EXPLORE_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const INITIAL_COUNT = 8;
const LOAD_MORE_STEP = 4;
const MIN_LOADING_MS = 800;

const SkeletonGrid = ({ count = INITIAL_COUNT }) => (
  <>
    <style>{`
      .ex-sk-card {
        pointer-events: none;
      }

      .ex-sk-card .ex-sk-avatar {
        width: 50px;
        height: 50px;
        border: 3px solid #fff;
        border-radius: 50%;
        box-sizing: border-box;
      }

      .ex-sk-card .ex-sk-image {
        display: block;
        width: 100%;
        height: 200px;
        border-radius: 8px;
      }

      .ex-sk-card .ex-sk-title {
        width: 65%;
        height: 18px;
        margin-bottom: 10px;
        border-radius: 4px;
      }

      .ex-sk-card .ex-sk-price {
        width: 35%;
        height: 14px;
        border-radius: 4px;
      }

      .ex-sk-card .ex-sk-like {
        width: 32px;
        height: 14px;
        border-radius: 4px;
      }

      .ex-sk-shimmer {
        background: linear-gradient(
          90deg,
          #e2e2e7 25%,
          #f5f5f8 50%,
          #e2e2e7 75%
        );
        background-size: 200% 100%;
        animation: ex-sk-shine 1.5s ease-in-out infinite;
      }

      @keyframes ex-sk-shine {
        from {
          background-position: -200% 0;
        }
        to {
          background-position: 200% 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ex-sk-shimmer {
          animation: none;
        }
      }
    `}</style>

    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        style={{ display: "block", backgroundSize: "cover" }}
        aria-hidden="true"
      >
        <div className="nft__item ex-sk-card">
          <div className="author_list_pp">
            <div className="ex-sk-avatar ex-sk-shimmer" />
          </div>

          <div className="nft__item_wrap">
            <div className="ex-sk-image ex-sk-shimmer" />
          </div>

          <div className="nft__item_info">
            <div className="ex-sk-title ex-sk-shimmer" />

            <div className="nft__item_price">
              <div className="ex-sk-price ex-sk-shimmer" />
            </div>

            <div className="nft__item_like">
              <div className="ex-sk-like ex-sk-shimmer" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

const Countdown = ({ expiryDate }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!expiryDate) return;

    const id = setInterval(() => setNow(Date.now()), 1000);

    return () => clearInterval(id);
  }, [expiryDate]);

  if (!expiryDate) return null;

  const diff = expiryDate - now;

  if (diff <= 0) {
    return <div className="de_countdown">EXPIRED</div>;
  }

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return <div className="de_countdown">{`${h}h ${m}m ${s}s`}</div>;
};

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    let cancelled = false;

    const url = filter
      ? `${EXPLORE_URL}?filter=${filter}`
      : EXPLORE_URL;

    const load = async () => {
      setStatus("loading");
      setVisibleCount(INITIAL_COUNT);

      try {
        const minDelay = new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_MS)
        );

        const [{ data }] = await Promise.all([
          axios.get(url),
          minDelay,
        ]);

        if (!cancelled) {
          setItems(data);
          setStatus("ready");
          // Refresh AOS positions when cards render
          setTimeout(() => {
            AOS.refresh();
          }, 100);
        }
      } catch (err) {
        console.error("Failed to load explore items:", err);

        if (!cancelled) {
          setStatus("error");
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [filter]);

  const handleLoadMore = () => {
    setVisibleCount((count) => count + LOAD_MORE_STEP);
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">
            Price, Low to High
          </option>
          <option value="price_high_to_low">
            Price, High to Low
          </option>
          <option value="likes_high_to_low">
            Most liked
          </option>
        </select>
      </div>

      {status === "loading" && (
        <SkeletonGrid count={INITIAL_COUNT} />
      )}

      {status === "error" && (
        <div className="col-12 text-center">
          <p>Couldn't load explore items.</p>
        </div>
      )}

      {status === "ready" &&
        visibleItems.map((item) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{
              display: "block",
              backgroundSize: "cover",
            }}
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-offset="100"
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`}>
                  <img
                    className="lazy"
                    src={item.authorImage}
                    alt=""
                  />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              <Countdown expiryDate={item.expiryDate} />

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <Link to={`/item-details/${item.nftId}`}>
                      <button>Buy Now</button>
                    </Link>
                    <div className="nft__item_share">
                      <h4>Share</h4>

                      <a
                        href=""
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>

                      <a
                        href=""
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>

                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt={item.title}
                  />
                </Link>
              </div>

              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>

                <div className="nft__item_price">
                  {item.price} ETH
                </div>

                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

      {status === "ready" && hasMore && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
