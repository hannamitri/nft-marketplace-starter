import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";


const SkeletonSlide = () => (
  <div className="keen-slider__slide">
    <div className="nft_coll skeleton-card">
      <div className="nft_wrap skeleton-box skeleton-image" />
      <div className="nft_coll_pp">
        <div className="skeleton-box skeleton-avatar" />
      </div>
      <div className="nft_coll_info">
        <div className="skeleton-box skeleton-title" />
        <div className="skeleton-box skeleton-subtitle" />
      </div>
    </div>
  </div>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
      "(max-width: 992px)": {
        slides: { perView: 2, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
      )
      .then((response) => {
        setCollections(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error fetching hot collections:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    instanceRef.current?.update();
  }, [collections, loading, instanceRef]);
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

        <div ref={sliderRef} className="keen-slider">
          {loading
          ? Array.from({length: 4}).map((_, index) => (
            <SkeletonSlide key={index} />
          ))
          : collections.map((item) => (
            <div className="keen-slider__slide" key={item.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.nftId}`} state={{ item }}>
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
                      alt="author-image"
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
      </div>
    </section>
  );
};

export default HotCollections;
