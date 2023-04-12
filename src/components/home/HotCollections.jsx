import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import "../../css/HotCollections.css"


import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const HotCollections = () => {

  const [imgs, setImgs] = useState([])
  const [loading, setLoading] = useState(true)

  async function Imgdata() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections?")
    setImgs(data)
    console.log(data)
    setLoading(false)
  }

  useEffect(() => {
    Imgdata()
  }, [])


   const options = {
    items:4,
    loop: true,
    margin: 10,
    nav: true, 
    dots: false,
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
      1410:{
        items:4
      }
    },
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
        <div className="wrapper">
          {
            loading ? (
              new Array(1).fill(0).map((_, index) => (
                <div className="wrap" key={index}>
                    <KeyboardArrowLeftIcon className="arrow__left arrow" />
                    <div className="nft_coll nft_coll-skeleton">
                        <div className="nft_wrap nft_wrap-skeleton">  
                         <div className="grey_box"></div>
                        </div>
                        <div className="nft_coll_pp loading">
                            <div className="lazy pp-coll"  alt="" />
                          <i className="fa fa-check "></i>
                        </div>
                        <div className="nft_coll_info ">
                            <h4 className="titleLoading"></h4>
                          <span className="spanLoading">ERC-111</span>
                        </div>
                      </div>
                      <div className="nft_coll nft_coll-skeleton">
                        <div className="nft_wrap nft_wrap-skeleton">  
                         <div className="grey_box"></div>
                        </div>
                        <div className="nft_coll_pp loading">
                            <div className="lazy pp-coll"  alt="" />
                          <i className="fa fa-check "></i>
                        </div>
                        <div className="nft_coll_info ">
                            <h4 className="titleLoading"></h4>
                          <span className="spanLoading">ERC-111</span>
                        </div>
                      </div>
                      <div className="nft_coll nft_coll-skeleton">
                        <div className="nft_wrap nft_wrap-skeleton">  
                         <div className="grey_box"></div>
                        </div>
                        <div className="nft_coll_pp loading">
                            <div className="lazy pp-coll"  alt="" />
                          <i className="fa fa-check "></i>
                        </div>
                        <div className="nft_coll_info ">
                            <h4 className="titleLoading"></h4>
                          <span className="spanLoading">ERC-111</span>
                        </div>
                      </div>
                    <KeyboardArrowRightIcon className="arrow__right arrow"/>
                </div>
              ))
              )
              :
              <OwlCarousel {...options}>
                {
                  (
                    imgs.map(img => (
                      <div className="nft_coll" key={img.id}>
                        <div className="nft_wrap ">
                          <Link to={`/item-details/${img.nftId}`}
                          >
                            <img src={img.nftImage} className="lazy img-fluid" alt="" />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/${img.authorId}`}
                          >
                            <img className="lazy pp-coll" src={img.authorImage} alt="" />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore"
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
          }
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;