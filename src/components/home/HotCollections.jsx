import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { use } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SkeletonCard from "../UI/SkeletonCard";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  async function getCollections() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    console.log("collection data:", data)
    setCollections(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getCollections();
  }, []);

  function NextArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow--next"
        style={{
          position: "absolute",
          top: "50%",
          right: "-25px",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 40,
          height: 40,
          background: "#fff",
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <i className="fa fa-chevron-right" style={{ fontSize: 16 }} />
      </div>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow--prev"
        style={{
          position: "absolute",
          top: "50%",
          left: "-25px",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 40,
          height: 40,
          background: "#fff",
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <i className="fa fa-chevron-left" style={{ fontSize: 16 }} />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
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
          <div className="carousel-wrapper">
    
          

            {/* Slider */}
            <Slider {...settings}>
              {isLoading
                ? new Array(4).fill(0).map((_, index) => (
                    <SkeletonCard key={index} />
                     
                  ))
                : collections.map((collection) => (
                    <div key={collection.id} className="keen-slider__slide">
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${collection.nftId}`}>
                            <img
                              src={collection.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${collection.authorId}`}>
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
        
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
