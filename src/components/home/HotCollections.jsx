import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import User from "../UI/User";
import axios from "axios";

const HotCollections = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchData() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setLoading(false);
    setCreators(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: false,
    arrows: true,

    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 410,
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
          <Slider {...settings}>
            {loading
              ? creators.map((creator) => {
                  return (
                    <div
                      key={creator.id}
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 slide"
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={creator.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={creator.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>Hello</h4>
                          </Link>
                          <span>ERC-</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              : creators.map((creator) => (
                  <User creator={creator} key={creator.id} />
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
