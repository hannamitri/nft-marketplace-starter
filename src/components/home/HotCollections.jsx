import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



const HotCollections = () => {

  const [collections, setCollections] = useState([])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000,
    centerPadding: "20px",
    className: "carousel__slider",
    rows: 1,
    SlidesPerRow
  };

  async function getCollections() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setCollections(data)
  }

  useEffect(() => {
    getCollections()
  },)

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
          <div className="carousel__container">
            <Slider {...settings}>
              {
                collections.map((collection, index) => {
                  return (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <div className="nft_coll " key={index}>
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
                  )
                })
              }  
            </Slider>    
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
