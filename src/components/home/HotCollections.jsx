import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./HotCollections.css"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setTimeout (()  => setLoading((false), 500));
      }
    };

    fetchCollections();
  }, []);

  const settings = {
    dots: false,
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
        <div className="text-center mb-4">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>
        
        {loading ? (
 
  <Slider {...settings}>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index}>
        <div className="nft_coll px-3">
          <div className="skeleton-box" />
          <div className="skeleton-info" />
        </div>
      </div>
    ))}
  </Slider>
) : (

        <Slider {...settings}>
          {collections.map((item, index) => (
            <div key={index}>
              <div className="nft_coll px-3">
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy img-fluid"
                      alt="nft"
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img
                      className="lazy pp-coll"
                      src={item.authorImage}
                      alt="author"
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to={`/explore`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <span>{item.code}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
)}
      </div>
    </section>
  );
};

export default HotCollections;
