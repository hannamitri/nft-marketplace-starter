import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

function formatRemaining(seconds) {
  if (seconds <= 0) return "Expired";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const controller = new AbortController();
    fetch(API, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load new items");
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading && (
            <div className="col-12 text-center">Loading new items…</div>
          )}
          {error && <div className="col-12 text-center text-danger">{error}</div>}

          {!loading && !error &&
            items.map((it) => {
              const remaining = Math.max(0, Math.floor((it.expiryDate - now) / 1000));
              return (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={it.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${it.authorId}`} title={`Creator: ${it.authorId}`}>
                        <img className="lazy" src={it.authorImage} alt="author" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">{formatRemaining(remaining)}</div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button type="button">Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a
                              href="https://www.facebook.com/sharer/sharer.php"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a
                              href="https://twitter.com/intent/tweet"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="mailto:?subject=Check%20this%20out">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${it.nftId}`}>
                        <img src={it.nftImage} className="lazy nft__item_preview" alt={it.title} />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${it.nftId}`}>
                        <h4>{it.title}</h4>
                      </Link>
                      <div className="nft__item_price">{it.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{it.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
