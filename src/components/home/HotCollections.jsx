import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function getCollections() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
        );
        setCollections(data);
      } catch (err) {
        console.error("Error fetching collections", err);
      } finally {
        setLoading(false);
      }
    }

    getCollections();
  }, []);

  function NextArrow(props) {
    const { className, onClick, style } = props;
    return (
      <div className={className} onClick={onClick} style={{ ...style, color: "black" }}>
        ›
      </div>
    );
  }

  function PrevArrow(props) {
    const { className, onClick, style } = props;
    return (
      <div className={className} onClick={onClick} style={{ ...style, color: "black" }}>
        ‹
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
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
          {loading ? (
            [...Array(4)].map((_, index) => (
              <div key={index} style={{ padding: "15px" }}>
                <Skeleton width="100%" height="350px" borderRadius="10px" />
              </div>
            ))
          ) : (
            <Slider {...settings}>
              {collections.map((collection, id) => (
                <div key={id}>
                  <div style={{ padding: "15px" }}>
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
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
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
