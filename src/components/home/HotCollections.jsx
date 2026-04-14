import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function NextArrow({ onClick }) {
  return (
    <button
      type="button"
      className="hot-collections-arrow hot-collections-arrow--next"
      onClick={onClick}
      aria-label="Next collections"
    >
      ›
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      type="button"
      className="hot-collections-arrow hot-collections-arrow--prev"
      onClick={onClick}
      aria-label="Previous collections"
    >
      ‹
    </button>
  );
}

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCollections(data);
      } catch (err) {
        console.error("Failed to fetch Hot Collections:", err);
        setError("Failed to load Hot Collections");
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    adaptiveHeight: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
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

  if (loading) {
    return (
      <section
        id="section-collections"
        className="no-bottom hot-collections-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="hot-collections-slider-wrap hot-collections-loading-wrap">
                <button
                  type="button"
                  className="hot-collections-arrow hot-collections-arrow--prev hot-collections-arrow--disabled"
                  aria-label="Previous collections"
                  disabled
                >
                  ‹
                </button>

                <div className="hot-collections-loading-track">
                  {[1, 2, 3, 4].map((item) => (
                    <div className="hot-collections-loading-slide" key={item}>
                      <div className="hot-collections-card hot-collections-skeleton-card">
                        <div className="hot-collections-skeleton-image shimmer"></div>

                        <div className="hot-collections-skeleton-avatar-wrap">
                          <div className="hot-collections-skeleton-avatar shimmer"></div>
                          <div className="hot-collections-skeleton-check"></div>
                        </div>

                        <div className="hot-collections-skeleton-body">
                          <div className="hot-collections-skeleton-line hot-collections-skeleton-line--title shimmer"></div>
                          <div className="hot-collections-skeleton-line hot-collections-skeleton-line--code shimmer"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="hot-collections-arrow hot-collections-arrow--next hot-collections-arrow--disabled"
                  aria-label="Next collections"
                  disabled
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
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
            <div className="col-12 text-center">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="section-collections"
      className="no-bottom hot-collections-section"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="hot-collections-slider-wrap">
              <Slider {...sliderSettings}>
                {collections.map((item) => (
                  <div className="hot-collections-slide" key={item.id}>
                    <div className="nft_coll hot-collections-card">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={item.nftImage}
                            className="img-fluid"
                            alt={item.title}
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="pp-coll"
                            src={item.authorImage}
                            alt={`${item.title} author`}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
