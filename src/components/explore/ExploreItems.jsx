import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const [time, setTime] = useState(Date.now());
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`,
        );
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [filter]);

  const getCountdown = (expirationDate) => {
    if (!expirationDate) {
      return null;
    }

    const expiryTime = new Date(expirationDate).getTime();
    const difference = expiryTime - time;

    if (difference <= 0) {
      return null;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const visibleList = items.slice(0, visibleItems);

  return (
    <>
      <div>
        <div>
          <label htmlFor="filter-items">Sort items</label>

          <select
            id="filter-items"
            data-aos="fade-up"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setVisibleItems(8);
            }}
          >
            <option value="">Default</option>
            <option value="price_low_to_high">Price, Low to High</option>
            <option value="price_high_to_low">Price, High to Low</option>
            <option value="likes_high_to_low">Most liked</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="row explore-items">
          {new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="nft__item skeleton-card">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-img"></div>
                <div className="nft__item_info">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-bottom">
                    <div className="skeleton-price"></div>
                    <div className="skeleton-like"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row explore-items">
          {visibleList.map((collection, index) => (
            <div className="col-lg-3 col-md-6" key={collection.id || index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${collection.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${collection.authorName || "Unknown"}`}
                  >
                    <img
                      className="lazy"
                      src={collection.authorImage || AuthorImage}
                      alt={collection.authorName || "Author"}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {getCountdown(collection.expiryDate) && (
                  <div className="de_countdown">
                    {getCountdown(collection.expiryDate)}
                  </div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>

                        <a
                          href="https://twitter.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>

                        <a href="mailto:">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${collection.nftId}`}>
                    <img
                      src={collection.nftImage || nftImage}
                      className="lazy nft__item_preview"
                      alt={collection.title || "NFT"}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${collection.nftId}`}>
                    <h2>{collection.title || "Pinky Ocean"}</h2>
                  </Link>

                  <div className="nft__item_bottom">
                    <div className="nft__item_price">
                      {collection.price || "1.74 ETH"}
                    </div>

                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{collection.likes || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <button
            data-aos="fade-up"
            type="button"
            id="loadmore"
            className="btn-main lead"
            onClick={() =>
              setVisibleItems((prev) => Math.min(prev + 4, items.length))
            }
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
