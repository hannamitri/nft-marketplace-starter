import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...arrowBaseStyle,
        right: "-20px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...arrowBaseStyle,
        left: "-20px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
};

const arrowBaseStyle = {
  display: "block",
  background: "black",
  zIndex: 2,
  fontSize: "24px",
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  async function fetchCollections() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setCollections(data);
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
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
        <div className="text-center mb-4">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>
        <Slider {...settings}>
          {collections.map((collection, index) => (
            <div key={index}>
              <div className="nft_coll mx-3">
                {" "}
                <div className="nft_wrap">
                  <Link to={`/item-details/${collection.id}`}>
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
                  <Link to={`/item-details/${collection.id}`}>
                    {" "}
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>ERC-{collection.code}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HotCollections;
