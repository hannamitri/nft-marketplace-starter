import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import NFTItem from "../NFTItem";import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    const results = response.data;
    setItems(results);
  }
  useEffect(() => {
    getData();
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "50px",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-in" data-aos-duration="1000">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="px-1" key={index}>
                      <div className="author_list_pp">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div
                        className="skeleton-box"
                        style={{
                          width: "80px",
                          height: "25px",
                          margin: "10px 0",
                          right: "-200px",
                        }}
                      ></div>
                    <div className="nft_wrap">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100%",
                          height: "200px",
                          borderRadius: "10px",
                        }}
                      ></div>
                    </div>
                    <div className="nft__item_info">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100px",
                          height: "20px",
                          marginBottom: "5px",
                        }}
                      ></div>
                      <br />
                      <div
                        className="skeleton-box"
                        style={{ width: "60px", height: "20px" }}
                      ></div>
                    </div>
                  </div>
                ))
              : items.map((item, index) => (
                  <NFTItem key={index} item={item} />
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;