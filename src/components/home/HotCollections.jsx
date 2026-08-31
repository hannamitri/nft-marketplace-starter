import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css";


const HotCollections = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
const setting = {
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true
};

  useEffect (() => {
    let timer;

    async function fetchData() {
      setLoading(true);

      try {
       const response = await fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );

    const result = await response.json(); 
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data")
      } finally {
        timer = setTimeout(() => setLoading(false), 2000) 
      };
  }

  fetchData();
  return () => clearTimeout(timer);
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

          <Slider {...setting}>
          {loading ? 
          (new Array(4).fill(0)
          .map((_, index) => <div key={index}>
            <div className="nft_coll">
              <div className="nft_wrap skeleton"></div></div></div>)) : (data.map((item) => (
          
             <div key={item.nftId}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img src={item.nftImage} className="lazy img-fluid" alt="" />
                   </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={item.authorImage} alt="" />
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
           )))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
