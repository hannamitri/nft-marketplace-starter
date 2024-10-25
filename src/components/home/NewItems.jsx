import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Countdown from 'react-countdown';


import "../../css/NewItems.css";
import NFTCard from "../UI/NFTCard";
import SkeletonNFTCard from "../UI/SkeletonNFTCard";

const NewItems = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);
  const slider = useRef(null);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function fetchNewItemsData() {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setCarouselData(response.data);
    setLoading(false);
  }

  function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : "";
    return (
      <svg
        onClick={props.onClick}
        className={`arrow new-items__arrow ${
          props.left ? "arrow--left" : "arrow--right"
        } ${disabled}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path
            fill="#8364E2"
            d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
          />
        )}
        {!props.left && (
          <path
            fill="#8364E2"
            d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"
          />
        )}
      </svg>
    );
  }

  useEffect(() => {
    setLoading(true);
    fetchNewItemsData();
  }, []);

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
          <Slider className="new-items__slider" ref={slider} {...settings}>
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <SkeletonNFTCard index={index} inSlider={true}/>
                ))
              : carouselData.map((item, index) => (
                  <NFTCard item={item} index={index} inSlider={true} />
                ))}
          </Slider>
          <div className="new-items__arrows--container">
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || slider?.current?.slickPrev()
              }
            />
            <Arrow
              onClick={(e) =>
                e.stopPropagation() || slider?.current?.slickNext()
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
