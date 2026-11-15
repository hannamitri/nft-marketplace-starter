import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 12,
        },
      },
      "(max-width: 600px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
  });

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch collections: ${response.status}`);
        }

        const data = await response.json();

        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (!Array.isArray(data)) {
          throw new Error("API response is not an array");
        }

        console.log("Hot Collections API response:", data);
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    if (collections.length > 0) {
      instanceRef.current?.update();
    }
  }, [collections, instanceRef]);

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
        </div>

        {loading && (
          <div className="row">
            {[1, 2, 3, 4].map((item) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={item}>
                <div className="nft_coll skeleton-card">
                  <div className="skeleton-image skeleton"></div>

                  <div className="skeleton-avatar skeleton"></div>

                  <div className="skeleton-title skeleton"></div>

                  <div className="skeleton-code skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center">
            <p>Unable to load collections: {error}</p>
          </div>
        )}

        {!loading && !error && collections.length === 0 && (
          <div className="text-center">
            <p>No collections available.</p>
          </div>
        )}

        {!loading && !error && collections.length > 0 && (
          <div className="hot-collections-slider">
            <div ref={sliderRef} className="keen-slider">
              {collections.map((collection) => (
                <div className="keen-slider__slide" key={collection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt={`${collection.title} creator`}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {collections.length > 1 && (
              <>
                <button
                  type="button"
                  className="hot-slider-arrow hot-slider-prev"
                  onClick={() => instanceRef.current?.prev()}
                  aria-label="Previous collection"
                >
                  &#10094;
                </button>

                <button
                  type="button"
                  className="hot-slider-arrow hot-slider-next"
                  onClick={() => instanceRef.current?.next()}
                  aria-label="Next collection"
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HotCollections;
