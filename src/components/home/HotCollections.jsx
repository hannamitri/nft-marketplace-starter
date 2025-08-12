import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollections(data);
      setLoading(false);
    };
    fetchCollection();
  }, []);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 4,
    },

    breakpoints: {
      "(max-width: 1200px)": {
        slides: { perView: 3 },
      },
      "(max-width: 992px)": {
        slides: { perView: 2 },
      },
      "(max-width: 576px)": {
        slides: { perView: 1 },
      },
    },
  });

  const handlePrev = () => {
    slider.current?.prev();
  };

  const handleNext = () => {
    slider.current?.next();
  };

  const skeletons = Array(4).fill(null);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>
        </div>

        <div className="position-relative">
          <div ref={sliderRef} className="keen-slider">
            {loading
              ? skeletons.map((_, index) => (
                  <div
                    key={index}
                    className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  >
                    <div className="nft_coll p-2 border rounded">
                      <div
                        className="skeleton w-100 mb-3 rounded"
                        style={{ height: "150px" }}
                      ></div>
                      <div
                        className="skeleton rounded-circle mx-auto mb-2"
                        style={{ height: "50px", width: "50px" }}
                      ></div>
                      <div
                        className="skeleton w-75 mx-auto mb-2 rounded"
                        style={{ height: "15px" }}
                      ></div>
                      <div
                        className="skeleton w-50 mx-auto rounded"
                        style={{ height: "15px" }}
                      ></div>
                    </div>
                  </div>
                ))
              : collections.map((item) => (
                  <div
                    className="keen-slider__slide col-lg-3 col-md-6 col-sm-6"
                    key={item.id}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy img-fluid"
                            alt={item.title}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={item.authorImage}
                            alt=""
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
          </div>

          {!loading && (
            <>
              <button
                aria-label="Previous slide"
                onClick={handlePrev}
                className="btn btn-light rounded-circle shadow position-absolute d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  left: "-20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                  zIndex: 10,
                }}
              >
                &#8249;
              </button>

              <button
                aria-label="Next slide"
                onClick={handleNext}
                className="btn btn-light rounded-circle shadow position-absolute d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  right: "-20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                  zIndex: 10,
                }}
              >
                &#8250;
              </button>
            </>
          )}
        </div>
      </div>

      <style>
        {`
          .skeleton {
            position: relative;
            overflow: hidden;
            background-color: #e0e0e0;
            border-radius: 0.25rem;
          }

          .skeleton::after {
            content: "";
            position: absolute;
            top: 0;
            left: -150px;
            height: 100%;
            width: 150px;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.6),
              transparent
            );
            animation: shimmer 1.5s infinite;
          }

          @keyframes shimmer {
            0% {
              left: -150px;
            }
            100% {
              left: 100%;
            }
          }
        `}
      </style>
    </section>
  );
};

export default HotCollections;