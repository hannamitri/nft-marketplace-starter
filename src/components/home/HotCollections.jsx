import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {

  const [collections, setCollections] = useState([])

  // carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  

  async function getCollections() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setCollections(data)
  }

  useEffect(() => {
    getCollections()
  }, [])

  const width = 100

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
            {new Array(6).fill(0).map((_, index) => (
              <div style={{ width: "100% !important;" }} className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img src={ collections[index]?.nftImage } className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/`}>
                      <img className="lazy pp-coll" src={ collections[index]?.authorImage } alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{ collections[index]?.title }</h4>
                    </Link>
                    <span>ERC-{ collections[index]?.code }</span>
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
