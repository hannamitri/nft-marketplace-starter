import React, { useEffect, useState } from "react";
import axios from "axios";
import NewItem from "../utility/NewItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from "react-slick";
import NewItemLoadingState from "../utility/NewItemLoadingState";

const NewItems = () => {
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

  async function fetchNewItemsData() {
    isLoading(true);
    let { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setData(data);
    setTimeout(() => {
      isLoading(false);
    },2000);
  }

  useEffect(() => {
    fetchNewItemsData();
    AOS.init();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container" data-aos="fade-up" data-aos-duration="500">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {!loading
              ? data.map((newItem) => (
                  <NewItem
                    newItem={newItem}
                    key={newItem.id}
                  />
                ))
              : new Array(data.length)
              .fill(0)
              .map((_, index) => <NewItemLoadingState key={index}/>)}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
