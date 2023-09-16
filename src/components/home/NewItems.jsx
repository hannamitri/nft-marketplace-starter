import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const NewItems = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [newItems, setNewItems] = useState([]);
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(url);
      setNewItems(response.data);
      setTimeout(() => {
        setIsLoaded(true);
      }, 200);
    }

    fetchData();
  }, [url]);

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
    speed: 500,
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

  function convertTime(releaseDate) {
    const seconds = (releaseDate - Date.now()) / 1000;
    const minutes = seconds / 60;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    const remainingSeconds = Math.floor((seconds % 60) % 60);
    return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoaded ? (
            <>
              <div className="slider__wrapper">
                <Slider ref={sliderRef} {...settings}>
                  {newItems.map((nft, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 new-items-nft"
                      key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${nft.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas">
                            <img
                              className="lazy"
                              src={nft.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {nft.expiryDate ? (
                          <div className="de_countdown">
                            {convertTime(nft.expiryDate)}
                          </div>
                        ) : null}

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${nft.nftId}`}>
                            <img
                              src={nft.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <h4>{nft.title}</h4>
                          </Link>
                          <div className="nft__item_price">{nft.price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{nft.likes}</span>
                          </div>
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
          ) : (
            <>false</>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
