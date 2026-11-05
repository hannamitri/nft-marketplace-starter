import React, { useEffect, useState }from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HotCollections = () => {

  const settings = {
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

  const [collections, setCollections] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  axios
    .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    .then((response) => {
      setCollections(response.data);
    })
    .finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    });
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
          <div className= "col-lg-12">
          <Slider {...settings} className="hot-collections-slider">
            {isLoading
            ? Array.from({ length:4 }).map((_, index) => (
              <div key={index}>
  <div className="nft_coll hot-collections-skeleton">

    <div className="nft_wrap">
      <div className="skeleton-box skeleton-nft-image"></div>
    </div>

    <div className="nft_coll_pp">
      <div className="skeleton-box skeleton-avatar"></div>
    </div>

    <div className="nft_coll_info">
      <div className="skeleton-box skeleton-title"></div>
      <div className="skeleton-box skeleton-code"></div>
    </div>

  </div>
</div>
            )) :
          collections.map((collection) => (
            <div key={collection.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage} alt="" />
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
