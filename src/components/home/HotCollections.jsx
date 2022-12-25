import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel'

const HotCollections = () => {

  const [collections, setCollections] = useState([])

  async function fetchData() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
    setCollections(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const carouselSettings = {
    nav: true,
    loop: true,
    items: 4,
    margin: 10,
    dots: false,
    responsiveRefreshRate: 50,
    responsive: {
      1200: {items: 4},
      768: {items: 3},
      470: {items: 2},
      0: {items: 1}
    }
  }

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
          <OwlCarousel key={Date.now()} {...carouselSettings} className='owl-theme'>
          {
            collections.length > 0
            ?
            collections.map((collection) => (
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
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
                    <span>{`ERC-${collection.code}`}</span>
                  </div>
                </div>
            ))
            :
            null
          }  
          </OwlCarousel>      
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
