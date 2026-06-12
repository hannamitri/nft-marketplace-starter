import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios'
import {useState, useEffect} from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HotCollectionsNext from "./HotCollectionsNext";
import HotCollectionsPrev from "./HotCollectionsPrev";
import "../../css/styles/slider-arrows.css"
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {

  const [collections, setCollections] = useState([])
  const getCollections = async () => {
    await axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((response) => {
        setCollections(response.data)
      })
  }

  let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <HotCollectionsNext />,
    prevArrow: <HotCollectionsPrev />,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      },
    ]
  }

  useEffect(() => {
    getCollections()
  }, [])

  const loading = collections.length === 0

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
          <Slider key={loading ? "loading" : "loaded"} {...settings}>
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width="100%" height="200px" />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info" style={{ textAlign: "center" }}>
                        <Skeleton
                          width="100px"
                          height="20px"
                          style={{ display: "block", margin: "0 auto 8px" }}
                        />
                        <Skeleton
                          width="60px"
                          height="16px"
                          style={{ display: "block", margin: "0 auto" }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              : collections.map((elem, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${elem.nftId}`}>
                          <img src={elem.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${elem.authorId}`}>
                          <img className="lazy pp-coll" src={elem.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{elem.title}</h4>
                        </Link>
                        <span>ERC-{elem.code}</span>
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
