import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

function parseDeadlineFlexible(item) {
  const raw =
    item?.expiryDate ??
    item?.deadline ??
    item?.expiry ??
    item?.expiresAt ??
    item?.endTime ??
    item?.expiration ??
    item?.ending_in ??
    item?.end_at ??
    item?.end;
  if (raw == null) return null;
  if (typeof raw === "number" || /^\d+$/.test(String(raw))) {
    const n = Number(raw);
    if (n < 1e6) return new Date(Date.now() + n * 1000);
    if (n < 1e12) return new Date(n * 1000);
    return new Date(n);
  }
  const d = new Date(raw);
  if (!isNaN(d.getTime())) return d;
  const h = /(\d+)\s*h/i.exec(raw)?.[1] ?? 0;
  const m = /(\d+)\s*m/i.exec(raw)?.[1] ?? 0;
  const s = /(\d+)\s*s/i.exec(raw)?.[1] ?? 0;
  if (+h || +m || +s)
    return new Date(Date.now() + (+h * 3600 + +m * 60 + +s) * 1000);
  return null;
}
function formatLeft(ms) {
  if (ms <= 0) return "Expired";
  const t = Math.floor(ms / 1000);
  const d = Math.floor(t / 86400);
  const h = Math.floor((t % 86400) / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return d > 0 ? `${d}d ${h}h ${m}m ${s}s` : `${h}h ${m}m ${s}s`;
}
function Countdown({ item }) {
  const target = parseDeadlineFlexible(item);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [item]);
  if (!target) return null;
  const left = target.getTime() - now;
  return (
    <div
      style={{
        background: "#fff",
        border: "2px solid #8364e2",
        borderRadius: "30px",
        color: "#0d0c22",
        padding: "1px 10px",
        position: "absolute",
        top: "5px",
        right: "20px",
        zIndex: 100,
        fontSize: "16px",
        opacity: left <= 0 ? 0.6 : 1,
      }}
    >
      {formatLeft(left)}
    </div>
  );
}

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [visible, setVisible] = useState(8);

  const num = (v) => {
    if (typeof v === "number") return v;
    if (v == null) return NaN;
    const parsed = parseFloat(String(v).replace(/[^\d.]/g, ""));
    return isNaN(parsed) ? NaN : parsed;
  };

  async function fetchExplore(params = {}) {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
        { params }
      );
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("explore fetch failed:", e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExplore();
  }, []);

  const sortedItems = useMemo(() => {
    const arr = [...items];
    if (sort === "price_low_to_high") {
      arr.sort(
        (a, b) => (num(a.price) || Infinity) - (num(b.price) || Infinity)
      );
    } else if (sort === "price_high_to_low") {
      arr.sort(
        (a, b) => (num(b.price) || -Infinity) - (num(a.price) || -Infinity)
      );
    } else if (sort === "likes_high_to_low") {
      arr.sort((a, b) => (num(b.likes) || 0) - (num(a.likes) || 0));
    }
    return arr;
  }, [items, sort]);

  function handleSortChange(e) {
    const value = e.target.value;
    setSort(value);
    setVisible(8);
    fetchExplore({ sort: value });
  }

  return (
    <>
      <div>
        <select id="filter-items" value={sort} onChange={handleSortChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        {loading
          ? new Array(8).fill(0).map((_, index) => (
              <div
                key={`sk-${index}`}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div
                      className="skeleton"
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                  </div>
                  <div className="nft__item_wrap" style={{ marginTop: 8 }}>
                    <div
                      className="skeleton"
                      style={{ width: "100%", height: 220, borderRadius: 12 }}
                    />
                  </div>
                  <div className="nft__item_info" style={{ marginTop: 10 }}>
                    <div
                      className="skeleton"
                      style={{ width: "70%", height: 16, borderRadius: 6 }}
                    />
                    <div
                      className="skeleton"
                      style={{
                        width: "40%",
                        height: 14,
                        borderRadius: 6,
                        marginTop: 6,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          : sortedItems.slice(0, visible).map((item, index) => (
  <div
    key={item.nftId ?? index}
    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
    style={{ display: "block" }}
  >
    <div className="nft__item">
      <div className="author_list_pp">
        <Link to={`/author?authorId=${item.authorId}`} title="Creator">
          <img
            className="lazy"
            src={item.authorImage || AuthorImage}
            alt=""
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      <div className="nft__item_wrap" style={{ position: "relative" }}>
        <Countdown item={item} />
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href="#" rel="noreferrer">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="#" rel="noreferrer">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="#">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <Link to={`/item-details?nftId=${item.nftId}`}>
          <img
            src={item.nftImage || nftImage}
            className="lazy nft__item_preview"
            alt={item.title || ""}
          />
        </Link>
      </div>

      <div className="nft__item_info">
        <Link to={`/item-details?nftId=${item.nftId}`}>
          <h4>{item.title || "Untitled"}</h4>
        </Link>
        <div className="nft__item_price">
          {typeof item.price === "number" ? `${item.price} ETH` : "—"}
        </div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{item.likes ?? 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {!loading && sortedItems.length > visible && (
        <div className="col-md-12 text-center" style={{ marginTop: 12 }}>
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisible((v) => v + 4)}
          >
            Load more
          </button>
        </div>
      )}

      <style>{`
        .skeleton { position: relative; overflow: hidden; background: #e6e6e6; }
        .skeleton::after {
          content: ""; position: absolute; inset: 0; transform: translateX(-100%);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.6) 50%, rgba(255,255,255,0) 100%);
          animation: shimmer 1.25s infinite;
        }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </>
  );
};

export default ExploreItems;
