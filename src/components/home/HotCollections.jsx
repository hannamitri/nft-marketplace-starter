import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton"; // Update this relative path to match your folder

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        if (!response.ok) throw new Error("Network response error");
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error pulling live data from the NFT cloud API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 }
    }
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

          {/* 1. SKELETON LOADING GRID */}
          {loading ? (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_coll">
                  
                  {/* Card Main Banner Block */}
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="145px" borderRadius="8px" />
                  </div>
                  
                  {/* Circular User Avatar Block */}
                  <div className="nft_coll_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </div>

                  {/* Dual Title & Code Info Text Lines */}
                  <div className="nft_coll_info">
                    <Skeleton width="100px" height="20px" borderRadius="4px" />
                    <br />
                    <Skeleton width="60px" height="14px" borderRadius="4px" />
                  </div>
                  
                </div>
              </div>
            ))
          ) : (
            
            /* 2. LIVE DATA CAROUSEL STATE */
            <div className="col-lg-12">
              {collections.length > 0 && (
                <OwlCarousel className="owl-theme" {...carouselOptions}>
                  {collections.map((item) => (
                    <div className="item" key={item.id}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${item.nftId}`}>
                            <img src={item.nftImage} className="lazy img-fluid" alt={item.title} />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img className="lazy pp-coll" src={item.authorImage} alt="Author" />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{item.title}</h4>
                          </Link>
                          <span>ERC-{item.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HotCollections;