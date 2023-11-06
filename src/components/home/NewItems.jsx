import React, { useEffect, useState } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
import NftCard from "../common/NftCard";

const NewItems = () => {
  const [nftArray, setNftArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNftArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black"}}
        onClick={onClick}
      />
    );
  }

  var carouselSettings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
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
          <Slider {...carouselSettings}>
            {nftArray.length > 0
              ? nftArray.map((nft) => (
                  <div className="carousel-slide" key={nft?.id}>
                    <NftCard nft={nft} />
                  </div>
                ))
              : Array.from({ length: 5 }).map((_, index) => (
                  <div className="carousel-slide" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton
                          width={"60px"}
                          height={"60px"}
                          borderRadius={"25px"}
                        />
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft__item_wrap">
                        <Skeleton width={"100%"} height={"100%"} />
                      </div>

                      <div className="nft__item_info">
                        <Skeleton
                          width={"160px"}
                          height={"20px"}
                          marginTop={"4px"}
                        />
                        <div className="nft__item_price">
                          <Skeleton width={"90px"} height={"20px"} />
                        </div>
                        <div className="nft__item_like">
                          <Skeleton width={"28px"} height={"20px"} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
