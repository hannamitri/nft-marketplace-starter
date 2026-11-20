import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        { signal: controller.signal }
      )
      .then((response) => {
        console.log("Hot Collections:", response.data);

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid collections data");
        }

        setCollections(response.data);
      })
      .catch((error) => {
        if (
          error.code === "ERR_CANCELED" ||
          error.name === "CanceledError"
        ) {
          return;
        }

        console.error("Error fetching collections:", error);
        setError("Unable to load collections.");
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Carousel settings
  const settings = {
    dots: false,
    infinite: collections.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    adaptiveHeight: false,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: collections.length > 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: collections.length > 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: collections.length > 1,
        },
      },
    ],
  };

  return (
    <section
      id="section-collections"
      className="no-bottom"
    >
      <div className="container">

        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>

              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {/* Skeleton Loading */}

        {loading && (
          <div className="hot-collections-skeleton">
            {[1, 2, 3, 4].map((item) => (
              <div className="skeleton-card" key={item}>
                <div className="skeleton-image"></div>

                <div className="skeleton-avatar"></div>

                <div className="skeleton-title"></div>

                <div className="skeleton-text"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error Message */}

        {!loading && error && (
          <div className="row">
            <div className="col-12 text-center">
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Dynamic Carousel */}

        {!loading && !error && collections.length > 0 && (
          <Slider {...settings} className="hot-collections-slider">

            {collections.map((collection) => (
              <div
                key={collection.id}
                className="hot-collection-slide"
              >
                <div className="nft_coll">

                  {/* NFT Image */}

                  <div className="nft_wrap">
                    <Link
                      to={`/item-details/${collection.nftId}`}
                    >
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt={collection.title}
                      />
                    </Link>
                  </div>

                  {/* Author Image */}

                  <div className="nft_coll_pp">
                    <Link
                      to={`/author/${collection.authorId}`}
                    >
                      <img
                        className="lazy pp-coll"
                        src={collection.authorImage}
                        alt={collection.title}
                      />
                    </Link>

                    <i className="fa fa-check"></i>
                  </div>

                  {/* NFT Information */}

                  <div className="nft_coll_info">
                    <Link
                      to={`/item-details/${collection.nftId}`}
                    >
                      <h4>{collection.title}</h4>
                    </Link>

                    <span>ERC-{collection.code}</span>
                  </div>

                </div>
              </div>
            ))}

          </Slider>
        )}

        {/* Empty State */}

        {!loading &&
          !error &&
          collections.length === 0 && (
            <div className="text-center">
              <p>No collections available.</p>
            </div>
          )}

      </div>
    </section>
  );
};

export default HotCollections;