import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



const HotCollections = () => {
  const [nftArray, setNftArray] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
          );
        setNftArray(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-in" data-aos-duration="1000">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...carouselSettings}>
            {nftArray.length > 0
              ? //Show nftArray if its length is greater than 0. 
                nftArray.map((nft) => (
                  <div className="carousel-slide" key={nft?.id}>
                    <div className="nft_coll mx-2">
                      <div className="nft_wrap ">
                        <Link to={`/item-details/${nft?.nftId}`}>
                          <img
                            src={nft?.nftImage}
                            className="lazy img-fluid "
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp ">
                        <Link to={`/author/${nft?.authorId}`}>
                          <img
                            className="lazy pp-coll  "
                            src={nft?.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{nft?.title}</h4>
                        </Link>
                        <span>{`ERC-${nft?.code}`}</span>
                      </div>
                    </div>
                  </div>
                ))
              : // Show skeleton loading state if nftArray.length isn't greater than 0. 
                Array.from({ length: 5 }).map((_, index) => (
                  <div className="carousel-slide" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap ">
                        <Skeleton width={"100%"} height={"100%"} />
                      </div>
                      <div className="nft_coll_pp ">
                        <Skeleton
                          width={"60px"}
                          height={"60px"}
                          borderRadius={"25px"}
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div>
                        <Skeleton width={"120px"} height={"20px"} />
                      </div>
                      <Skeleton width={"90px"} height={"20px"} />
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
