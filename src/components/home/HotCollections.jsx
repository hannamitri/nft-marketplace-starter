import React from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import "../../css/HotCollections.css"

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "react-loading-skeleton";

const HotCollections = () => {

  const [imgs, setImgs] = useState([])
  const [loading, setLoading] = useState(false)
  
  async function Imgdata() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setImgs(data)
  }
  
  useEffect(() => {
    Imgdata()
    setLoading(true)
  }, [])

  const options = {
    items:4,
    responsive: {
      0: {
        items:1
      },
      640: {
        items:2
      },
      1050:{
        items:3
      },
      1620:{
        items:4
      }
    },
    loop: true,
    margin: 15,
    nav: true, 
    dots: false,
    smartSpeed: 150,
  }


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row " >
        
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
          <OwlCarousel className="owl-theme" {...options}>
          {
            loading ? (
              new Array(4).fill(0).map((_, index) =>{
                <div className="post" key={index}>
            <div className="post__title">
              <div className="post__title--skeleton"></div>
            </div>
            <div className="post__body">
              <p className="post__body--skeleton"></p>
            </div>
          </div>
              })
            )
            :
            (
                imgs.map(img => (
                  <div className="nft_coll">
                <div className="nft_wrap ">
                  <Link to="item-details" 
                  // {`/${item-details}`}
                  >
                    <img src={img.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author"
                  // {`/${author}`}
                  >
                    <img className="lazy pp-coll" src={img.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore"
                  // {`/${explore}`}
                  >
                    <h4>{img.title}</h4>
                  </Link>
                  <span>ERC-${img.code}</span>
                </div>
              </div>  
            ))
          )
        }
        </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;