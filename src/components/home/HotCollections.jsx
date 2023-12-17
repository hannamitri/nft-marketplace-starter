/* eslint-disable no-unused-vars */ import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HotCollections = () => {
  const [collectionData, setCollectionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
      )
      .then((res) => {
        setCollectionData(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const owlCarouselOptions = {
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
      900: {
        items: 3,
      },
      1200: {
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
          {isLoading ? (
            new Array(1).fill(0).map((_, index) => (
              <OwlCarousel
                className="owl-rtl"
                {...owlCarouselOptions}
                key={index}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton height="100%" width="100%" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton circle={true} height={50} width={50} />
                    <i className="fa fa-check" style={{ zIndex: 1 }}></i>
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton height={20} width={100} />
                    <Skeleton height={20} width={60} />
                  </div>
                </div>
              </OwlCarousel>
            ))
          ) : (
            <OwlCarousel className="owl-rtl" {...owlCarouselOptions}>
              {collectionData.map((item, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={item.nftImage || <Skeleton />}
                        className="lazy img-fluid custom-owl-carousel"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll custom-owl-carousel"
                        src={item.authorImage || <Skeleton />}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{item.title || <Skeleton />}</h4>
                    </Link>
                    <span>ERC-{item.code || <Skeleton />}</span>
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
