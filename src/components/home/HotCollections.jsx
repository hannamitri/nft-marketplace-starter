import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css"
import "react-loading-skeleton/dist/skeleton.css";


const HotCollections = () => {
  
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    .then((response) => {
      setTimeout(() => {
        setCollections(response.data);
        setLoading(false);
    }, 3000)
  })
    .catch((error) => {
      console.error("No collection found:", error);
    });
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 770,
      settings: {
      slidesToShow: 2,
      }
    },
    {
      breakpoint: 460,
      settings: {
        slidesToShow: 1,
      }
    }
  ]

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
          <div className="slider-container">
            <Slider {...settings}>
              {loading ?
              new Array(4).fill(0).map((_, index) => (
                <div className= "col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
                  <div className= "skeleton__img--hotCollections"></div>
                  <div className= "skeleton__authorImage--hotCollections"></div>
                  <div className= "skeleton__title--hotCollections"></div>
                  <div className= "skeleton__code--hotCollections"></div>
                </div>
              ))
              :
            collections.map((collection, index) => (    
              <div className = "hotCollections" key={index}>
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
                    <span>ERC-{collection.code}</span>
                  </div>
                </div>
              </div>
            ))}
           </Slider> 
          </div> 
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
