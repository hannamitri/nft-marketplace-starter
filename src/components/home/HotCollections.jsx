import React, { useEffect, useState } from "react";
import axios from "axios";
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
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 991px)": {
        slides: {
          perView: 2,
          spacing: 15,
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
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );

        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
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

          {loading ? (
            <div className="col-lg-12">
              <div className="collections-slider-wrapper">
                <div className="keen-slider skeleton-slider">
                  {new Array(4).fill(0).map((_, index) => (
                    <div
                      className={`keen-slider__slide skeleton-slide skeleton-slide-${index}`}
                      key={index}
                    >
                      <div className="nft_coll skeleton-collection">
                        <div className="skeleton skeleton-image"></div>

                        <div className="skeleton-info">
                          <div className="skeleton skeleton-avatar"></div>

                          <div className="skeleton-text">
                            <div className="skeleton skeleton-title"></div>
                            <div className="skeleton skeleton-subtitle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="collections-slider-wrapper">
                <button
                  className="carousel-arrow carousel-arrow-left"
                  onClick={() => slider.current?.prev()}
                  aria-label="Previous collection"
                >
                  <i className="fa fa-chevron-left"></i>
                </button>

                <div ref={sliderRef} className="keen-slider">
                  {collections.map((collection, index) => (
                    <div
                      className="keen-slider__slide"
                      key={collection.id || index}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${collection.nftId}`}>
                            <img
                              src={collection.nftImage || nftImage}
                              className="lazy img-fluid"
                              alt={collection.title || "NFT collection"}
                            />
                          </Link>
                        </div>

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

                        <div className="nft_coll_info">
                          <Link to={`/item-details/${collection.nftId}`}>
                            <h4>{collection.title}</h4>
                          </Link>
                          <span>ERC-{collection.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="carousel-arrow carousel-arrow-right"
                  onClick={() => slider.current?.next()}
                  aria-label="Next collection"
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
