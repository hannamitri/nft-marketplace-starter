import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const API =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API);
        const data = await res.json();
        setCollections(Array.isArray(data) ? data : []);
      } catch {
        setCollections([]);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    }
    load();
  }, []);

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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading && (
            <div className="col-lg-12">
              <div className="row">
                {[...Array(4)].map((_, i) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
                    <div className="nft_coll skeleton-card skeleton-shimmer">
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
                {collections.map((item, index) => {
                  const cover = item.nftImage || item.image || nftImage;
                  const avatar = item.authorImage || item.avatar || AuthorImage;
                  const title = item.title || item.name || "Untitled";
                  const code = item.code || item.category || "";

                  return (
                    <div
                      className="nft_coll"
                      key={item.id || item._id || index}
                      data-aos="fade-up"
                    >
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={cover}
                            className="lazy img-fluid"
                            alt={title}
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={avatar}
                            alt={title}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{title}</h4>
                        </Link>
                        <span>{code}</span>
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

export default HotCollections;