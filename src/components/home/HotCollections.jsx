import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 20,
    },
    move: {
      type: "slide",
    },
    breakpoints: {
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 10 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(max-width: 1024px)": {
        slides: { perView: 3, spacing: 20 },
      },
    },
  });

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setHotCollections(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setHotCollections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  if (loading) {
    return <p>Loading collections...</p>;
  }

  if (error) {
    return <p>Error loading collections: {error}</p>;
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12 position-relative">
            <div ref={sliderRef} className="keen-slider">
              {hotCollections.map((collection) => (
                <div key={collection.id} className="keen-slider__slide">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt={`Author ${collection.authorId}`}
                        />
                      </Link>

                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/explore?collection=${collection.code}`}>
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {slider && (
              <>
                <button
                  onClick={(e) => e.stopPropagation() || slider.current?.prev()}
                  className="keen-slider__prev custom-arrow"
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button
                  onClick={(e) => e.stopPropagation() || slider.current?.next()}
                  className="keen-slider__next custom-arrow"
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;