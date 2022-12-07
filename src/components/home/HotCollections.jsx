import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



const HotCollections = () => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  async function getCollections() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setCollections(data)
    setLoading(false)
  }

  useEffect(() => {
    getCollections()
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
            <Carousel responsive={responsive} itemClass="carousel__slider"  infinite={true}>
              {
               loading ? (
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
                          <Link to="/author">
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
            </Carousel>    
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
