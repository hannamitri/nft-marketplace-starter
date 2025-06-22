import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        console.log("Fetching collections...");
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        console.log("Collections fetched:", response.data);
        setCollections(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
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
          <div className="col-lg-12">
            <div className="custom-carousel-container">
              {loading ? (
                <Slider ref={sliderRef} {...settings}>
                  {new Array(8).fill(0).map((_, index) => (
                    <div key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width="100%" height="200px" borderRadius="8px" />
                        </div>
                        <div className="nft_coll_pp">
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                        </div>
                        <div className="nft_coll_info">
                          <Skeleton width="80%" height="20px" borderRadius="4px" />
                          <div style={{ marginTop: "8px" }}>
                            <Skeleton width="60%" height="16px" borderRadius="4px" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <Slider ref={sliderRef} {...settings}>
                  {collections.map((collection, index) => (
                    <div key={collection.id || index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={collection.nftImage || nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={collection.authorImage || AuthorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{collection.title || "Untitled"}</h4>
                          </Link>
                          <span>{collection.code || "Unknown"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
              <div className="owl-nav">
                <div className="owl-prev" onClick={goToPrev}>
                  <i className="fa fa-angle-left"></i>
                </div>
                <div className="owl-next" onClick={goToNext}>
                  <i className="fa fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

