import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/btn.css";
import "../../css/styles/skeleton.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

function Next(props) {
  const { className, style, onClick } = props;
  return (
    <div>
      <FontAwesomeIcon
        icon={faChevronRight}
        onClick={onClick}
        className={className}
        id="btn"
      />
    </div>
  );
}
function Prev(props) {
  const { className, style, onClick } = props;
  return (
    <div>
      <FontAwesomeIcon
        icon={faChevronLeft}
        onClick={onClick}
        className={className}
        id="btn2"
      />
    </div>
  );
}

const HotCollections = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setUserData(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
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
          <div className="slider-container">
            <Slider {...sliderSettings}>
              {loading ? (
                
                [1, 2, 3, 4].map((index) => (
                  <div className="col-lg col-md-6 col-sm-6 col-xs-12" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap skeleton-wrap">
                        <div className="skeleton-img"></div>
                      </div>
                      <div className="nft_coll_pp">
                        <div className="skeleton-avatar"></div>
                      </div>
                      <div className="nft_coll_info">
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                
                userData.map((item, index) => (
                  <div className="col-lg col-md-6 col-sm-6 col-xs-12" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img src={item.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img className="lazy pp-coll" src={item.authorImage} alt="" />
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
                ))
              )}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
