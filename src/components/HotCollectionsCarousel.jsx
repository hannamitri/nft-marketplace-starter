import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollectionsCarousel = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  async function DynamicHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    );
    setCollections(data);
    setLoading(false);
  }
  useEffect(() => {
    DynamicHotCollections();
  }, []);

  const SkeletonSlide = () => (
    <div className="nft_coll">
      <div className="nft_wrap skeleton-box"></div>
      <div className="nft_coll_pp skeleton-circle"></div>
      <div className="nft_coll_info">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line tiny"></div>
      </div>
    </div>
  );

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  return loading ? (
    <div className="skeleton-grid">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonSlide key={i} />
      ))}
    </div>
  ) : (
    <Slider {...settings}>
      {collections.map((collection, index) => (
        <div key={index}>
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
      ))}
    </Slider>
  );
};

export default HotCollectionsCarousel;
