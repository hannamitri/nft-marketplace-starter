import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css";

const HOT_COLLECTIONS_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";
const EXTRA_LOADING_DELAY_MS = 1000;

const DESKTOP_SLIDES = 4;

function HotCollectionsPrevArrow({ className, style, onClick }) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={onClick}
      aria-label="Previous collections"
    >
      <i className="fa fa-chevron-left" aria-hidden="true" />
    </button>
  );
}

function HotCollectionsNextArrow({ className, style, onClick }) {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={onClick}
      aria-label="Next collections"
    >
      <i className="fa fa-chevron-right" aria-hidden="true" />
    </button>
  );
}

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sliderSettings = useMemo(() => {
    const count = collections.length;
    const slidesToShow = Math.min(DESKTOP_SLIDES, Math.max(1, count));
    return {
      dots: true,
      arrows: count > 0,
      infinite: count > 1,
      speed: 500,
      slidesToShow,
      slidesToScroll: 1,
      prevArrow: <HotCollectionsPrevArrow />,
      nextArrow: <HotCollectionsNextArrow />,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: Math.min(3, Math.max(1, count)),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: Math.min(2, Math.max(1, count)),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  }, [collections.length]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(HOT_COLLECTIONS_URL);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!cancelled) {
          setCollections(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Failed to load collections");
          setCollections([]);
        }
      } finally {
        await new Promise((resolve) =>
          setTimeout(resolve, EXTRA_LOADING_DELAY_MS)
        );
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

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
          {loading &&
            new Array(DESKTOP_SLIDES).fill(0).map((_, index) => (
              <div
                key={`hot-collection-skeleton-${index}`}
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="220px" borderRadius="10px" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton width="70%" height="22px" borderRadius="4px" />
                    <Skeleton width="45%" height="18px" borderRadius="4px" />
                  </div>
                </div>
              </div>
            ))}
          {error && !loading && (
            <div className="col-lg-12 text-center">
              <p className="text-danger" role="alert">
                {error}
              </p>
            </div>
          )}
          {!loading && !error && collections.length === 0 && (
            <div className="col-lg-12 text-center">
              <p>No collections to show.</p>
            </div>
          )}
          {!loading && !error && collections.length > 0 && (
            <div className="col-lg-12 hot-collections-slider">
              <Slider {...sliderSettings}>
                {collections.map((item, index) => {
                  const detailId = item.nftId ?? item.id;
                  const detailPath = detailId ? `/item-details/${detailId}` : "/item-details";
                  const authorPath = item.authorId ? `/author/${item.authorId}` : "/author";
                  const cardKey = item.id ?? item.nftId ?? `hot-collection-${index}`;

                  return (
                  <div key={cardKey}>
                    <div className="px-2">
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={detailPath} state={{ selectedItem: item }}>
                            <img
                              src={item.nftImage}
                              className="lazy img-fluid"
                              alt={item.title || ""}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={authorPath}>
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to={detailPath} state={{ selectedItem: item }}>
                            <h4>{item.title}</h4>
                          </Link>
                          <span>ERC-{item.code}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )})}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
