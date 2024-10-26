import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

import "../../css/HotCollections.css";

const HotCollections = () => {
  AOS.init();
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHotCollectionsData() {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCarouselData(response.data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchHotCollectionsData();
  }, []);

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
    ]
  };

  function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : "";
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${
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

  return (
    <section data-aos="fade" data-aos-duration="1000" data-aos-delay="50" id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="navigation-wrapper">
            <Slider ref={slider} {...settings}>
            {carouselData.length === 0 
                ? new Array(6).fill(0).map((item, index) => (
                    <div
                      className="nft__container"
                      key={index}
                    >
                      
                      <div className="nft_coll skeleton__box">
                        <div className="nft_wrap skeleton ">
                            
                        </div>
                        <div className="nft_coll_pp skeleton__box">
                            <div className="pfp_skeleton"></div>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info skeleton__box">
                            <div className="skeleton__title"></div>
                          <div className="skeleton__sub-title"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : carouselData.map((item, index) => (
                    <div
                      className="nft__container"
                      key={item.id}
                    >
                      
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={"/item-details/"+item.nftId}>
                            <img
                              src={item.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={"/author/" + item.authorId}>
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{item.title}</h4>
                          </Link>
                          <span>ERC-{item.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
            <Arrow
                  left
                  onClick={(e) =>
                    e.stopPropagation()|| slider?.current?.slickPrev()
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

export default HotCollections;
