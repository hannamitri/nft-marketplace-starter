import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HotCollections = () => {
  const [hotCollectionsData, setHotCollectionsData] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchHotCollections() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollectionsData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  const responsiveness = {
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 4,
      },
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
          {loading ? (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={12}
              responsive={responsiveness.responsive}
            >
              {hotCollectionsData.map((item) => (
                <div className="" key={item.id}>
                <div className="w-fit max-w-md">
                <div className="nft_coll">
                <div className="nft_wrap">
                <Link to="/item-details">
                  <img
                    src={item.nftImage}
                    className="lazy img-fluid"
                    alt=""/>
                </Link>
                </div>
                <div className="nft_coll_pp">
                <Link to="/author">
                  <img
                  className="lazy pp-coll"
                  src={item.authorImage}
                  alt="" />
                </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                <h4>{item.title}</h4>
                  </Link>
                  <span>ERC-192</span>
                </div>
                </div>
                </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={12}
              responsive={responsiveness.responsive}
            >
              {new Array(1).fill(0).map((_, index) => (
              <div className="" key={index}>
              <div className="nft_coll">
              <div className="nft_wrap">
                <Skeleton width={250} height={150} borderRadius={1} />
              </div>
              <div className="nft_coll_pp">
              <div className="lazy pp-coll">
                <Skeleton width={50} height={50} borderRadius={50} />
              </div>
                <i className="fa fa-check" style={{ zIndex: 50 }}></i>
              </div>
              <div className="nft_coll_info">
              <h4>
                <Skeleton width={150} height={25} borderRadius={1} />
              </h4>
              <span>
                <Skeleton width={100} height={25} borderRadius={1} />
              </span>
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
