import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";



const HotCollections = () => {

  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    autoplay: false,
    navText: ["<", ">"],
    smartSpeed: 600,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };


  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  async function getCollections() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setCollections(data)
    setLoading(true)
  }

  useEffect(() => {
    getCollections()
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

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
          <div className="carousel__container">
            <ReactOwlCarousel {...options}>
              {
               !loading ? (
                new Array(4).fill(0).map((_, index) => (
                  <div className="carousel__item" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap skeleton">
                        <Link to="/item-details">
                          <img className="lazy img-fluid skeleton" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img className="header__img skeleton" alt="" />
                        </Link>
                        <i className="fa fa-check skeleton"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <div className="skeleton skeleton__text--title"></div>
                        </Link>
                        <div className="skeleton skeleton__text"></div>
                      </div>
                    </div>
                  </div>
                ))
               ) : (
                collections.map((collection, index) => {
                  return (
                    <div className="carousel__item">
                      <div className="nft_coll " key={index}>
                        <div className="nft_wrap ">
                          <Link to="/item-details">
                            <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${collection.authorId}`}>
                            <img className="lazy pp-coll skeleton" src={collection.authorImage} alt="" />
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
                  )
                }))
              }  
            </ReactOwlCarousel>    
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;