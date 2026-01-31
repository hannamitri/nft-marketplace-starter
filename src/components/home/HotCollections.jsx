import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCollections() {
    try {
      setLoading(true);
      const [response] = await Promise.all([
        axios.get("/hotCollections"),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);
      setCollections(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
    slideBy: 1,
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
          {loading ? (
            <OwlCarousel className="owl-theme" {...options} key="loading">
              {new Array(4).fill(0).map((_, index) => (
                <div className="item" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="200px" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="100px" height="20px" />
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="owl-theme fade-in" {...options} key="loaded">
              {collections.map((collection) => (
                <div className="item" key={collection.id}>
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
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
