import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((response) => {
        setTimeout(() => {
          setCollections(response.data);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    renderMode: "performance",
    slides: {
      perView: 4,
      spacing: 0,
    },
    breakpoints: {
      "(max-width: 992px)": {
        slides: { perView: 2 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1 },
      },
      "(max-width: 576px)": {
        slides: { perView: 1 },
      },
    },
  });

  return (
    <section id="section-collections" className="no-bottom" data-aos="fade-up">
      <div className="container">
        <div className="col-lg-12 text-center">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <div className="row">
          <div style={{ position: "relative" }}>

            <div
              ref={sliderRef}
              className="keen-slider"
              key={loading ? "loading" : "loaded"}
            >

              {loading
                ? new Array(4).fill(0).map((_, index) => (
                    <div
                      className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap skeleton-box"></div>
                        <div className="nft_coll_pp skeleton-circle"></div>
                        <div className="nft_coll_info">
                          <div className="skeleton-text"></div>
                          <div className="skeleton-text small"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : collections.slice(0, 6).map((item, index) => (
                    <div
                      className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <div className="nft_coll">

                        <div className="nft_wrap">
                          <Link to={`/item-details/${item.nftId}`} state={item}>
                            <img
                              src={item.nftImage || nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="nft_coll_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage || AuthorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>

                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{item.title || "Pinky Ocean"}</h4>
                          </Link>
                          <span>ERC-{item.code || "192"}</span>
                        </div>

                      </div>
                    </div>
                  ))}

            </div>

            <button
              className="button owl-prev"
              onClick={() => instanceRef.current?.prev()}
            >
              <FontAwesomeIcon icon={faCircleChevronLeft} />
            </button>

            <button
              className="button owl-next"
              onClick={() => instanceRef.current?.next()}
            >
              <FontAwesomeIcon icon={faCircleChevronRight} />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;