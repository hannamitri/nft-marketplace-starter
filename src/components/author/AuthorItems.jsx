import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const AuthorItems = ({ authorId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(API, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load author items");
        return res.json();
      })
      .then((data) => {
        setItems(data.filter((it) => String(it.authorId) === String(authorId)));
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading && <div className="col-12">Loading items…</div>}
          {error && <div className="col-12 text-danger">{error}</div>}
          {!loading && !error && items.length === 0 && (
            <div className="col-12">This author has no items yet.</div>
          )}

          {!loading &&
            !error &&
            items.map((it) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={it.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${authorId}`}>
                      <img className="lazy" src={it.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
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
                      <img
                        src={it.nftImage}
                        className="lazy nft__item_preview"
                        alt={it.title}
                      />
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
