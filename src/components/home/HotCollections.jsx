import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

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
          throw new Error("Failed to fetch hot collections");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Hot Collections API:", data);

        setCollections(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hot Collections API Error:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && collections.length > 0) {
      slider.current?.update();
    }
  }, [loading, collections, slider]);

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

          {/* SKELETON LOADING */}
          {loading &&
            new Array(6).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_coll">
                  <div
                    className="nft_wrap"
                    style={{
                      height: "250px",
                      background: "#e5e5e5",
                      borderRadius: "8px",
                      animation:
                        "hotCollectionsSkeletonPulse 1.5s ease-in-out infinite",
                    }}
                  ></div>

                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "#e5e5e5",
                      marginTop: "-30px",
                      marginLeft: "20px",
                      position: "relative",
                      zIndex: 2,
                      animation:
                        "hotCollectionsSkeletonPulse 1.5s ease-in-out infinite",
                    }}
                  ></div>

                  <div style={{ padding: "15px 0" }}>
                    <div
                      style={{
                        width: "60%",
                        height: "18px",
                        background: "#e5e5e5",
                        borderRadius: "4px",
                        marginBottom: "10px",
                        animation:
                          "hotCollectionsSkeletonPulse 1.5s ease-in-out infinite",
                      }}
                    ></div>

                    <div
                      style={{
                        width: "35%",
                        height: "14px",
                        background: "#e5e5e5",
                        borderRadius: "4px",
                        animation:
                          "hotCollectionsSkeletonPulse 1.5s ease-in-out infinite",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

          {/* KEEN SLIDER */}
          {!loading && (
            <div className="col-lg-12">
              <div ref={sliderRef} className="keen-slider">
                {collections.map((collection) => (
                  <div className="keen-slider__slide" key={collection.id}>
                    <div className="nft_coll">
                      {/* NFT IMAGE */}
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage || nftImage}
                            className="lazy img-fluid"
                            alt={collection.title || "NFT"}
                          />
                        </Link>
                      </div>

                      {/* authorImage */}
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage || AuthorImage}
                            alt={collection.title || "Author"}
                          />
                        </Link>

                        <i className="fa fa-check"></i>
                      </div>

                      {/* COLLECTION INFO */}
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
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes hotCollectionsSkeletonPulse {
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
