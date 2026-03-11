import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="nft_coll">
    <div className="nft_wrap">
      <div
        className="skeleton-box"
        style={{ height: "200px", width: "100%" }}
      ></div>
    </div>
    <div className="nft_coll_pp">
      <div
        className="skeleton-circle"
        style={{ width: "50px", height: "50px", margin: "0 auto" }}
      ></div>
    </div>
    <div className="nft_coll_info" style={{ textAlign: "center" }}>
      <div
        className="skeleton-text"
        style={{ width: "60%", height: "20px", margin: "0 auto 8px" }}
      ></div>
      <div
        className="skeleton-text"
        style={{ width: "40%", height: "16px", margin: "0 auto" }}
      ></div>
    </div>
  </div>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    items: 4,
    slideBy: 1,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 4 },
    },
  };

  // LOADING STATE WITH SKELETON
  if (loading) {
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
            {[1, 2, 3, 4].map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // LOADED STATE WITH CAROUSEL
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
            <OwlCarousel className="owl-theme" {...options}>
              {collections.map((collection, index) => (
                <div className="item" key={collection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt={collection.authorName}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
