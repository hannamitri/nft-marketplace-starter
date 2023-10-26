import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from 'react-loading-skeleton';

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState();
  useEffect(() => {
    setLoading(true);
  
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => {
        
        setTimeout(() => {
          setCollections(res.data);
          setLoading(false);
        }, 2000); 
      })
      .finally(() => {
        setLoading(false);
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

          <OwlCarousel className="owl-rtl" {...owlCarouselOptions}>
            {loading ? (
              
              Array.from({ length: 4 }).map((_, index) => (
                
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Skeleton height="100%" width="100%" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton circle={true} height={50} width={50} />
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton height={20} width={100}  />
                    <Skeleton  height={20} width={60} />
                  </div>
                </div>
                
              ))
            ) : (
              
              collections.map((collection, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img src={collection.nftImage} className="lazy img-fluid" alt={collection.title} />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img className="lazy pp-coll" src={collection.authorImage} alt={collection.authorId} />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collection.title || <Skeleton />}</h4>
                    </Link>
                    <span>ERC-{collection.code || <Skeleton />}</span>
                  </div>
                </div>
              ))
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
