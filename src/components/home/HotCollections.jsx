import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";

import AuthorImage from "../../images/author_thumbnail.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 991px)": {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },
      "(max-width: 575px)": {
        slides: {
          perView: 1,
          spacing: 15,
        },
      },
    },
  });

  useEffect(() => {
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Hot Collections");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Hot Collections:", data);

        setCollections(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hot Collections Error:", error);
        setLoading(false);
      });
  }, []);

  const skeletonCards = [1, 2, 3, 4];

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        {/* TITLE */}
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {/* SKELETON */}
        {loading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "20px",
            }}
          >
            {skeletonCards.map((item) => (
              <div key={item}>
                <div
                  style={{
                    width: "100%",
                    height: "250px",
                    background: "#e5e5e5",
                    borderRadius: "8px",
                    animation: "hotSkeletonPulse 1.5s ease-in-out infinite",
                  }}
                ></div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    paddingTop: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      minWidth: "50px",
                      borderRadius: "50%",
                      background: "#e5e5e5",
                    }}
                  ></div>

                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        width: "70%",
                        height: "18px",
                        background: "#e5e5e5",
                        borderRadius: "4px",
                        marginBottom: "10px",
                      }}
                    ></div>

                    <div
                      style={{
                        width: "40%",
                        height: "14px",
                        background: "#e5e5e5",
                        borderRadius: "4px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KEEN SLIDER */}
        {!loading && collections.length > 0 && (
          <>
            <div ref={sliderRef} className="keen-slider">
              {collections.map((collection) => (
                <div className="keen-slider__slide" key={collection.id}>
                  <div className="nft_coll">
                    {/* NFT IMAGE */}
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={collection.nftImage}
                          className="img-fluid"
                          alt={collection.title}
                          style={{
                            width: "100%",
                            display: "block",
                          }}
                        />
                      </Link>
                    </div>

                    {/* AUTHOR */}
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="pp-coll"
                          src={collection.authorImage || AuthorImage}
                          alt={collection.title}
                        />
                      </Link>

                      <i className="fa fa-check"></i>
                    </div>

                    {/* INFO */}
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

            {/* NAVIGATION */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "25px",
              }}
            >
              <button
                type="button"
                onClick={() => slider.current?.prev()}
                style={{
                  border: "none",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                <i className="fa fa-chevron-left"></i>
              </button>

              <button
                type="button"
                onClick={() => slider.current?.next()}
                style={{
                  border: "none",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </>
        )}
      </div>

      {/* SKELETON ANIMATION */}
      <style>
        {`
          @keyframes hotSkeletonPulse {
            0% {
              opacity: 1;
            }

            50% {
              opacity: 0.5;
            }

            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </section>
  );
};

export default HotCollections;
