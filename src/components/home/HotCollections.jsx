import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.default.css"
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  async function getHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
     setCollections(data);
  }

  useEffect (() => {
    getHotCollections();
  },[]);

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
     {collections.length === 0 ? (     
      <div className="row">
       {new Array(4).fill(0).map((_, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
          key={index}>
            <Skeleton
            width="100%"
            height="350px"
            borderRadius="12px"/>
            </div>
       ))}
       </div>
       ) : (
          <OwlCarousel
          className="owl-carousel owl-theme"
          loop
          margin={20}
          nav
          dots={false}
          responsive={{
            0: { items: 1},
            600: { items: 2},
            1000: { items: 4},
          }}
          >
          {collections.map((collection) => (
            <div className="item" key={collection.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${collection.nftId}`}>
                    <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage} alt="" />
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
