import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [nftArray, setNftArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setNftArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  var carouselSettings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...carouselSettings}>
            {nftArray.length > 0
              ? //Show nftArray if its length is superior to 0. In other words, when nftArray is fetched.
                nftArray.map((nft) => (
                  <div className="carousel-slide" key={nft.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap ">
                        <Link to="/item-details">
                          <img
                            src={nft.nftImage}
                            className="lazy img-fluid "
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp ">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll  "
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
                        <span>{`ERC-${nft.code}`}</span>
                      </div>
                    </div>
                  </div>
                ))
              : // Show skeleton loading state if nftArray.length isn't superior than 0. In other words, when nftArray isn't fetched. An array of length 5 is created then is filled with empty nft objects that have a loading state animation. I picked an array of length 5 instead of 6 to save memory.
                Array.from({ length: 5 }).map((_, index) => (
                  <div className="carousel-slide" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap ">
                        <Skeleton width={"100%"} height={"100%"}>
                          <div>&nbsp;</div>
                        </Skeleton>
                      </div>
                      <div className="nft_coll_pp ">
                        <Skeleton
                          width={"60px"}
                          height={"60px"}
                          borderRadius={"25px"}
                        >
                          <div>&nbsp;</div>
                        </Skeleton>
                        <i className="fa fa-check"></i>
                      </div>
                      <div>
                        <Skeleton width={"120px"} height={"19.19px"}>
                          <div>&nbsp;</div>
                        </Skeleton>
                      </div>
                      <Skeleton width={"90px"} height={"19.19px"}>
                        <div>&nbsp;</div>
                      </Skeleton>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
