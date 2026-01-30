import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch data from API
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setItems([]);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    }
    load();
  }, []);

  // Calculate countdown
  const getTimeLeft = (expiryDate) => {
    if (!expiryDate) return "";

    const end = new Date(expiryDate).getTime();
    if (isNaN(end)) return "";

    const diff = end - now;
    if (diff <= 0) return "Expired";

    const seconds = Math.floor(diff / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours}h ${minutes}m ${secs}s`;
  };

  const options = {
    loop: true,
    nav: true,
    dots: false,
    margin: 30,
    smartSpeed: 600,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      992: { items: 3 },
      1200: { items: 4 },
    },
  };

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
            <div className="col-lg-12">
              <div className="row">
                {[...Array(4)].map((_, i) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={i}
                  >
                    <div className="nft__item skeleton-card skeleton-shimmer">
                      <div className="skeleton-img"></div>
                      <div className="skeleton-body">
                        <div className="skeleton-avatar"></div>
                        <div className="skeleton-line title"></div>
                        <div className="skeleton-line sub"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && (
            <div className="col-lg-12">
              <OwlCarousel className="owl-carousel owl-theme" {...options}>
                {items.map((item, index) => {
                  const cover = item.nftImage || item.image || nftImage;
                  const avatar = item.authorImage || item.avatar || AuthorImage;
                  const title = item.title || item.name || "Untitled";
                  const price = item.price ?? "0";
                  const likes = item.likes ?? 0;
                  const countdown = getTimeLeft(item.expiryDate);
                  const authorId = item.authorId || "";
                  const nftId = item.nftId || index;

                  return (
                    <div className="nft__item" key={item.id || item._id || index}>
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.authorName || "Unknown"}`}
                        >
                          <img className="lazy" src={avatar} alt={title} />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {countdown && (
                        <div className="de_countdown">{countdown}</div>
                      )}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a
                                href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a
                                href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="mailto:?subject=NFT&body=Check this out">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${nftId}`}>
                          <img
                            src={cover}
                            className="lazy nft__item_preview"
                            alt={title}
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to={`/item-details/${nftId}`}>
                          <h4>{title}</h4>
                        </Link>
                        <div className="nft__item_price">{price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{likes}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </OwlCarousel>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;