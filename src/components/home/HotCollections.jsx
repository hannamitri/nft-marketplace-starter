import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  const getExploreData = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      );
      setHotCollections(response.data);
    } catch (error) {
      console.error("Error fetching Hot Collections", error);
    }
  };

  useEffect(() => {
    getExploreData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
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
          <div className="col-12">
            <Slider {...settings}>
              {hotCollections.length > 0
                ? hotCollections.map((collection, index) => (
                    <div className="col-xs-12"
                      key={index}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${collection.nftId || ""}`}>
                            <img
                              src={collection.nftImage || nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${collection.authorId || ""}`}>
                            <img
                              className="lazy pp-coll"
                              src={collection.authorImage || AuthorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link
                            to={`/explore/${collection.collectionId || ""}`}
                          >
                            <h4>{collection.title || "No Title"}</h4>
                          </Link>
                          <span>ERC-{collection.code || "No Code"}</span>
                        </div>
                      </div>
                    </div>
                  ))
                : new Array(4).fill(0).map((_, index) => (
                    <div
                      className="col-xs-12"
                      key={index}
                    >
                      <div className="skeleton-card">
                        <div className="skeleton-img"></div>
                        <div className="skeleton-avatar"></div>
                        <div className="skeleton-check">
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="skeleton-title"></div>
                        <div className="skeleton-subtitle"></div>
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
