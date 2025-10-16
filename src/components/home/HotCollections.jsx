import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/components/HotCollections.css";
import Slider from "react-slick";

const HotCollections = () => {
  const NextArrow = ({ onClick }) => (
    <div className="custom-arrow next" onClick={onClick}>
      <i className="fa fa-chevron-right"></i>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow prev" onClick={onClick}>
      <i className="fa fa-chevron-left"></i>
    </div>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1156,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
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

  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  //fetch Hot Collection data from API
  useEffect(() => {
    const fetchHotCollection = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setHotCollections(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHotCollection();
    setLoading(false);
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
          {loading ? (
            <div className="skeleton-slider-wrapper">
              <div className="skeleton__arrow prev"></div>
              <Slider {...settings}>
                {new Array(4).fill(0).map((_, index) => (
                  <div className="p-2" key={index}>
                    <div className="nft_coll">
                      <div className="skeleton__nft_wrap nft_wrap">
                        <div className="skeleton__background--img"></div>
                      </div>
                      <div className="nft_coll_pp skeleton__author-bubble">
                        <i className="fa fa-check skeleton__check"></i>
                      </div>
                      <div className="nft_coll_info skeleton__info">
                        <h4 className="skeleton__name"></h4>
                        <span className="skeleton__code"></span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="skeleton__arrow next"></div>
            </div>
          ) : (
            <Slider {...settings}>
              {hotCollections.map((data, index) => (
                <div className="p-2" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${data.nftId}`}>
                        <img
                          src={data.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${data.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={data.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{data.title}</h4>
                      </Link>
                      <span>ERC-{data.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
