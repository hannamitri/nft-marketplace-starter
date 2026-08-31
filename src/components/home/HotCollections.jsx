import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(data);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
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
            {loading ? (
              /* --- Skeleton Loader --- */
              <div className="row">
                {new Array(4).fill(0).map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div
                          className="skeleton-box"
                          style={{ width: "100%", height: "200px" }}
                        ></div>
                      </div>
                      <div className="nft_coll_pp">
                        <div
                          className="skeleton-box"
                          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                        ></div>
                      </div>
                      <div className="nft_coll_info" style={{ marginTop: "30px" }}>
                        <div
                          className="skeleton-box"
                          style={{ width: "100px", height: "20px" }}
                        ></div>
                        <br />
                        <div
                          className="skeleton-box"
                          style={{ width: "60px", height: "15px", marginTop: "8px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* --- Owl Carousel --- */
              <OwlCarousel key="hot-collections-carousel" className="owl-theme" {...options}>
                {collections.map((item) => (
                  <div className="nft_coll" key={item.id}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img src={item.nftImage} className="lazy img-fluid" alt={item.title} />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img className="lazy pp-coll" src={item.authorImage} alt={item.title} />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
