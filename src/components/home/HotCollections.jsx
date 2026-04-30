import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      1024: { items: 4 },
    },
  };

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const skeletonCount =
    viewportWidth < 480
      ? 1
      : viewportWidth < 768
        ? 2
        : viewportWidth < 1024
          ? 3
          : 4;

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get(API_URL);
        setCollections(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2 data-aos="zoom-in" data-aos-duration="800">Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>
        <div>
          {loading ? (
            <OwlCarousel key="loading" {...options}>
              {new Array(skeletonCount).fill(0).map((_, index) => (
                <div
                  key={index}
                  style={{ border: "none" }}
                  className="nft_coll"
                >
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="200px" borderRadius="10px" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <h4>
                      <Skeleton width="120px" height="20px" />
                    </h4>
                    <span>
                      <Skeleton width="80px" height="20px" />
                    </span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel data-aos="fade-up" data-aos-duration="800" key="loaded" {...options}>
              {collections.map((item) => (
                <div key={item.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>{item.code}</span>
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
