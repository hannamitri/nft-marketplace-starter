import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./HotCollections.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaAngleRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaAngleLeft />
      </div>
    );
  };

  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    slickPlay: true,
    responsive: [
      {
        breakpoint: 980,
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
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  async function fetchCollections() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCollections();
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
            {loading
              ? new Array(5).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <div className="skeleton nft_wrap-skeleton"></div>
                    </div>
                    <div className="nft_coll_pp">
                      <div className="skeleton nft_coll_pp-skeleton"></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <div className="skeleton nft_coll_info-skeleton"></div>
                      <br />
                      <div className="skeleton nft_code_info-skeleton"></div>
                    </div>
                  </div>
                ))
              : collections.map((collection) => (
                  <div className="" key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
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

export default HotCollections;