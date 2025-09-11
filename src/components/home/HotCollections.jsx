import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import $ from "jquery";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const API_URL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setCollections(response.data))
      .catch((error) => {
        console.log("Error Fetching Data", error);
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

          <ReactOwlCarousel
            className="owl-theme"
            loop
            margin={10}
            nav
            items={4}
            responsive={{ 0: { items: 1 }, 600: { items: 2 }, 992: { items: 3 }, 1200: { items: 4 } }}
          >
            {collections.map((item, index) => (
              <div className="item" key={item.id || index}>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={item?.nftImage || nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={item?.authorImage || AuthorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item?.title || "Pinky Ocean"}</h4>
                      </Link>
                      <span>ERC-192</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ReactOwlCarousel>
        
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
