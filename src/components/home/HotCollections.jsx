import React, { useEffect, useState } from "react";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "../../css/styles/keen-slider.css";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  async function fetchCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 10,
    },
    loop: true,
    breakpoints: {
      "(max-width: 1200px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      "(max-width: 576px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
  });

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
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {collections.length
                ? collections.map((nft, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={nft.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={nft.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{nft.title}</h4>
                          </Link>
                          <span>ERC-{nft.code}</span>
                        </div>
                      </div>
                    </div>
                  ))
                : new Array(6).fill(0).map((_, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <div className="nft_coll">
                        <div className="skeleton skeleton-bg"></div>
                        <div className="nft_coll_pp">
                          <div className="skeleton skeleton__profile--image"></div>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <h4 className="skeleton name-skeleton"></h4>
                          <span className="skeleton id-skeleton"></span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            {instanceRef.current && (
              <>
                <button
                  className="arrow__button arrow__button--left"
                  onClick={() => instanceRef.current?.prev()}
                >
                  <RiArrowLeftSLine className="arrow__icon" />
                </button>

                <button
                  className="arrow__button arrow__button--right"
                  onClick={() => instanceRef.current?.next()}
                >
                  <RiArrowRightSLine className="arrow__icon" />
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
