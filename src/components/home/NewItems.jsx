import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import NftWithTimer from "../UI/NftWithTimer";

const NewItems = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [newItems, setNewItems] = useState([]);
  const url =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
  const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8];

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
    <>
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
              <div className="slider__wrapper">
                <Slider ref={sliderRef} {...settings}>
                  {newItems.map((nft, index) => (
                    <span
                      key={index}
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 new-items-nft">
                      <NftWithTimer nft={nft} key={index} />
                    </span>
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
            ) : (
              <div className="slider__wrapper">
                <Slider ref={sliderRef} {...settings}>
                  {skeletonArr.map((__, index) => (
                    <div className="new-items__item--skeleton" key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <div
                            className="new-items__img--skeleton--wrapper skeleton"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas">
                            <img className="lazy" alt="" />
                          </div>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft__item_wrap skeleton">
                          <img className="lazy nft__item_preview" alt="" />
                        </div>
                        <div className="nft__item_info">
                          <span className="new-items__title--skeleton skeleton">
                            Title Title Title
                          </span>
                          <span className="nft__item_price new-items__price--skeleton skeleton">
                            5.07 ETH
                          </span>
                          <span className="nft__item_like new-items__likes--skeleton skeleton">
                            Likes
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
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewItems;
