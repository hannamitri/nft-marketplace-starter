import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorFallback from "../../images/author_thumbnail.jpg";
import NftFallback from "../../images/nftImage.jpg";

const API_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const ExploreItems = () => {
  const [filterKey, setFilterKey] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const formatCountdown = (end) => {
    if (!end) return null;
    const t = typeof end === "number" ? end : Date.parse(end);
    if (Number.isNaN(t)) return null;
    const ms = Math.max(0, t - now);
    if (ms === 0) return "Ended";
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  const url = useMemo(() => {
    if (filterKey) return `${API_URL}?filter=${encodeURIComponent(filterKey)}`;
    return API_URL;
  }, [filterKey]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setVisibleCount(8);
    axios
      .get(url)
      .then((res) => {
        if (!mounted) return;
        const arr = Array.isArray(res.data) ? res.data : [];
        setItems(arr);
      })
      .catch(() => {
        if (!mounted) return;
        setItems([]);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [url]);

  const onLoadMore = (e) => {
    e.preventDefault();
    setVisibleCount((c) => c + 4);
  };

  const visibleItems = loading ? [] : items.slice(0, visibleCount);

  return (
    <>
      <style>{`
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .skeleton{
          background:linear-gradient(90deg,#e9ecef 0%,#f8f9fa 40%,#e9ecef 80%);
          background-size:200% 100%;
          animation:shimmer 1.2s linear infinite;
          border-radius:8px;
        }
      `}</style>

      <div className="col-12 mb-4">
        <select
          id="filter-items"
          value={filterKey}
          onChange={(e) => setFilterKey(e.target.value)}
          className="form-select"
          style={{ maxWidth: 260 }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={`sk-${index}`}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <div className="skeleton" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                </div>
                <div className="nft__item_wrap">
                  <div className="skeleton" style={{ width: "100%", paddingTop: "100%", borderRadius: 12 }} />
                </div>
                <div className="nft__item_info">
                  <div className="skeleton" style={{ width: "70%", height: 16, marginBottom: 8 }} />
                  <div className="skeleton" style={{ width: 90, height: 14 }} />
                </div>
              </div>
            </div>
          ))
        : visibleItems.map((it, index) => {
            const id = it?.id ?? it?.nftId ?? `it-${index}`;
            const title = it?.title || it?.name || `Item #${index + 1}`;
            const price = typeof it?.price === "number" ? `${it.price} ETH` : it?.price || "—";
            const likes = it?.likes ?? it?.like ?? 0;
            const nftImg = it?.nftImage || it?.image || NftFallback;
            const authorImg = it?.authorImage || AuthorFallback;
            const authorName = it?.authorName || "Anonymous";
            const authorId = it?.authorId ?? "";
            const rawEnd =
              it?.expiryDate ||
              it?.endAt ||
              it?.deadline ||
              it?.ending ||
              it?.countdown ||
              it?.expiry ||
              it?.endingIn;
            const countdown = formatCountdown(rawEnd);

            return (
              <div
                key={id}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={authorId ? `/author/${authorId}` : "/author"}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    >
                      <img className="lazy" src={authorImg} alt={authorName} />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  {countdown ? <div className="de_countdown">{countdown}</div> : null}

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              window.location.origin + "/item-details/" + id
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                              window.location.origin + "/item-details/" + id
                            )}&text=${encodeURIComponent(title)}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a
                            href={`mailto:?subject=${encodeURIComponent(
                              title
                            )}&body=${encodeURIComponent(
                              window.location.origin + "/item-details/" + id
                            )}`}
                          >
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={`/item-details/${id}`}>
                      <img src={nftImg} className="lazy nft__item_preview" alt={title} />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${id}`}>
                      <h4>{title}</h4>
                    </Link>

                    <div className="nft__item_price">{price}</div>

                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

      {!loading && items.length === 0 && (
        <div className="col-12">
          <div className="alert alert-warning mb-0">No items found.</div>
        </div>
      )}

      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <Link to="" id="loadmore" className="btn-main lead" onClick={onLoadMore}>
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
