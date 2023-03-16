import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../css/styles/loadingStateHot.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((response) => {
        setCollections(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const options = {
    items: 4,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    rewind: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  const renderSkeleton = () => (
    <div className="nft_coll">
      <div className="nft_wrap">
        <div
          className="skeleton-box"
          style={{ width: "100%", height: "240px" }}
        ></div>
      </div>
      <div className="nft_coll_pp">
        <div
          className="skeleton-box"
          style={{ width: "64px", height: "64px", borderRadius: "50%" }}
        ></div>
      </div>
      <div className="nft_coll_info">
        <div className="skeleton-text-wrapper">
          <div
            className="skeleton-box"
            style={{ width: "200px", height: "20px", marginBottom: "8px" }}
          ></div>
          <div
            className="skeleton-box"
            style={{ width: "100px", height: "20px" }}
          ></div>
        </div>
      </div>
    </div>
  );
  

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
          {isLoading ? (
            <>
            <OwlCarousel className="owl-theme" {...options}>
            {Array(4)
              .fill(null)
              .map((_, index) => <div key={index}>{renderSkeleton()}</div>)}
              </OwlCarousel>
              </>
          ) : (
            <OwlCarousel className="owl-theme" {...options}>
              {collections.map((collection) => (
                <div key={collection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt={collection.authorId}
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
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

