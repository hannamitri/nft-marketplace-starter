import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HotItem from "../utility/HotItem";
import HotItemLoadingState from "../utility/HotItemLoadingState";

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  async function getData() {
    isLoading(true);
    let { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setData(data);
    setTimeout(() => {
      isLoading(false);
    }, 2000);
  }
  useEffect(() => {
    getData();
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
          <Slider {...settings}>
            {!loading
              ? data.map((nft) => <HotItem nft={nft} key={nft.key} />)
              : new Array(6)
                  .fill(0)
                  .map((_, index) => <HotItemLoadingState key={index} />)}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
