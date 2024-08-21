import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const apiUrl =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

  const [hotCollections, setHotCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 4,
    },
    breakpoints: {
      '(max-width: 1200px)': {
        slides: {
          perView: 3,
        },
      },
      '(max-width: 768px)': {
        slides: {
          perView: 2,
        },
      },
      '(max-width: 480px)': {
        slides: {
          perView: 1,
        },
      },
    },
  });

  useEffect(() => {
    async function fetchHotCollections() {
      try {
        const response = await axios.get(apiUrl);
        const { data } = response;

        setHotCollections(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchHotCollections();
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
        </div>
        <div className="keen-slider-container position-relative">
          <button
            className="arrow arrow-left"
            onClick={() => instanceRef.current?.prev()}
          >
            &lt;
          </button>
          <div ref={sliderRef} className="keen-slider">
            {isLoading ? (
              new Array(4).fill(0).map((_, index) => (
                <div className="keen-slider__slide col-lg-3 col-md-4 col-sm-6" key={index}>
                  <div className="nft_coll skeleton">
                    <div className="nft_wrap skeleton-img"></div>
                    <div className="nft_coll_pp skeleton-avatar"></div>
                    <div className="nft_coll_info">
                      <div className="skeleton-text title"></div>
                      <div className="skeleton-text subtitle"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              hotCollections.map((collection, index) => (
                <div className="keen-slider__slide col-lg-3 col-md-4 col-sm-6" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
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
              ))
            )}
          </div>
          <button
            className="arrow arrow-right"
            onClick={() => instanceRef.current?.next()}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
