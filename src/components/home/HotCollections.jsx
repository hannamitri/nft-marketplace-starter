import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Slider from "react-slick";

const HotCollections = () => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollection(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchCollections();
  }, []);

  const sliderSettings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
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
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row ">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collection</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            {loading ? (
              <Slider {...sliderSettings}>
                {new Array(4).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap__skeleton shimmer"></div>
                    <div className="nft_coll_pp">
                      <div className="nft_coll_pp__skeleton shimmer lazy pp-coll" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4 className="author_title__skeleton shimmer"></h4>
                      </Link>
                      <span className="span__skeleton shimmer"></span>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider {...sliderSettings}>
                {collection.map((item, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt={item.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt={item.author}
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
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
