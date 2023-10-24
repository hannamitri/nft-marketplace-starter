import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((response) => {
        setCollections(response.data);
      });
  }, []);
  
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
          <OwlCarousel className="owl-rtl" 
          loop={true} margin={10} nav={true} items={4} >
          { collections.map((collections, index) => (
            
              <div className="nft_coll" key={index}>
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collections.nftImage} className="lazy img-fluid" alt={collections.title} />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collections.authorImage} alt={collections.authorId} />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collections.title}</h4>
                  </Link>
                  <span>ERC-{collections.code}</span>
                </div>
              </div>
            
          ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
