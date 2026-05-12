import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton.jsx";


const HotCollections = () => {

  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((response) => {
        setHotCollections(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 992, 
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768, 
        settings: { slidesToShow: 1 }
      }
    ]
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
        <div className="slider-container">
          {loading ? (
            <div className="d-flex">
              {new Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-sm-12" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width={100} height={200} />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width={50} height={50} borderRadius={50} />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width={100} height={20} />
                      <br />
                      <Skeleton width={60} height={15} />
                      </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <Slider {...settings}>
          {hotCollections.map((data, index) =>(
            <div className="px-2" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={data.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={data.authorImage} alt="" />
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
      </div>
    </section>
  );
};

export default HotCollections;
