
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 992px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
      "(max-width: 576px)": {
        slides: {
          perView: 1,
          spacing: 15,
        },
      },
    },
  });

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.error("Error fetching collections:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    slider.current?.update();
  }, [collections, isLoading, slider]);

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

          <div ref={sliderRef} className="keen-slider">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className="keen-slider__slide"
                    key={index}
                  >
                    <div className="nft_coll skeleton-card">
                      <div className="skeleton skeleton-image"></div>
                      <div className="skeleton skeleton-avatar"></div>
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  </div>
                ))
              : collections.map((collection) => (
                  <div
                    className="keen-slider__slide"
                    key={collection.id}
                  >
                    <div className="nft_coll"
                    data-aos="fade-up">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage || nftImage}
                            className="lazy img-fluid"
                            alt={collection.title}
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={
                              collection.authorImage ||
                              AuthorImage
                            }
                            alt=""
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

          <div className="text-center mt-4">
            <button
              className="btn-main"
              onClick={() => slider.current?.prev()}
            >
              Previous
            </button>

            <button
              className="btn-main ml-2"
              onClick={() => slider.current?.next()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;



