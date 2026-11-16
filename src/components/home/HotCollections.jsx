import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../../css/styles/HotCollections.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 4,
      spacing: 15,
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(max-width: 1200px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    async function getHotCollections() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching hot collections:", error.message);
      } finally {
        setLoading(false);
      }
    }

    getHotCollections();
  }, []);

  useEffect(() => {
    if (!loading) {
      instanceRef.current?.update();
    }
  }, [collections, instanceRef, loading]);

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

          <div
            style={{ position: "relative", width: "100%" }}
            aria-busy={loading}
          >
            <div ref={sliderRef} className="keen-slider">
              {loading
                ? Array.from({ length: 4 }, (_, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <div
                        className="nft_coll skeleton-box"
                        style={{ margin: 0 }}
                        aria-hidden="true"
                      />
                    </div>
                  ))
                : collections.map((coll) => (
                  <div
                    className="keen-slider__slide"
                    key={coll.id}
                    style={{ overflow: "visible" }}
                  >
                    <div className="nft_coll" style={{ margin: 0 }}>
                      <div className="nft_wrap">
                        <Link to={`/item-details/${coll.nftId}`}>
                          <img
                            src={coll.nftImage}
                            className="lazy img-fluid"
                            alt={coll.title}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${coll.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={coll.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{coll.title}</h4>
                        </Link>
                        <span>ERC-{coll.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {!loading && loaded && instanceRef.current && (
              <>
                <button
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  className="arrow-btn arrow-btn--left"
                  aria-label="Previous collection"
                >
                  <i className="fa fa-chevron-left"></i>
                </button>

                <button
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  className="arrow-btn arrow-btn--right"
                  aria-label="Next collection"
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
