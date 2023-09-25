import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const HotCollections = () => {
  const [HotCollectionsLoaded, setHotCollectionsLoaded] = useState(false);
  const [nftHotCollectionsData, setNftHotCollectionsData] = useState([]);
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(url);
      setNftHotCollectionsData(response.data);
      setTimeout(() => {
        setHotCollectionsLoaded(true);
      }, 200);
    }

    fetchData();
  }, [url]);

  const skeletonArr = [1, 2, 3, 4, 5, 6];

  const sliderRef = React.useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container" data-aos="fade-in">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {HotCollectionsLoaded ? (
            <div className="slider__wrapper">
              <Slider ref={sliderRef} {...settings}>
                {nftHotCollectionsData.map((nft, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12 hot-collections-nft"
                    key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${nft.nftId}`}>
                          <img
                            src={nft.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${nft.authorId}`}>
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
                ))}
              </Slider>
              <button className="slider-prev-btn slider-btn" onClick={previous}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className="slider-next-btn slider-btn" onClick={next}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          ) : (
            <>
              <div className="slider__wrapper">
                <Slider ref={sliderRef} {...settings}>
                  {skeletonArr.map((obj, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 hot-collections-nft"
                      key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <div
                              src=""
                              className="lazy img-fluid skeleton skeleton__hot-collections--img"
                              alt="NFT IMAGE"></div>
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <div className="lazy pp-coll skeleton skeleton__hot-collections--author--img"></div>
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <span className="skeleton skeleton__hot-collections--title">
                              NFT TITLE NFT TITLE
                            </span>
                            <br />
                          </Link>
                          <span className="skeleton skeleton__hot-collections--code">
                            NFT CODE
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
                <button
                  className="slider-prev-btn slider-btn"
                  onClick={previous}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className="slider-next-btn slider-btn" onClick={next}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
