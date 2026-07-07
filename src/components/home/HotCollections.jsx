import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import {useEffect, useState } from "react";

const HotCollections = () => {
  const [collections,setCollections]= useState([])
  const [loading,setLoading]= useState(true)
    const fetchCollections = async () => {
      try {
     const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally{
        setLoading(false)
      }
    };
       

useEffect(() => {
  const timer = setTimeout(() => {
        fetchCollections();

  }, 10000);
 return () => clearTimeout(timer);
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:true,
    lazyLoad:"ondemand",
    responsive: [
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
],

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
</div>
  <div className="col-lg-12 slider-container">

{loading ? (
       <div className="row">
 <Slider {...settings}> 
{ new Array(4).fill(0).map((_,index) => (
    <div className="nft_coll" key={index}>

                <div className="nft_wrap">             
<div className="skeleton skeleton-main-img"></div> 
                </div>
                <div className="nft_coll_pp">
                 <div className="skeleton skeleton-author-img"></div>
                  
                </div>
                <div className="nft_coll_info">
<div className="skeleton skeleton_title"></div>        
               <div className="skeleton skeleton-code"></div>
                </div>
              </div>

))}
</Slider>
</div>
):(
<Slider {...settings}>
          {collections.map((item) => (
            <div  key={item.nftId}>
              <div className="nft_coll">
                <div className="nft_wrap">
                 <Link to={`/item-details/${item.nftId}`}>
                    <img src={item.nftImage} className="lazy img-fluid" alt="" loading="lazy" />

                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${item.authorId}`}>


                    <img className="lazy pp-coll" src={item.authorImage} alt="" loading="lazy" />

                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">

                    <h4 loading="lazy">{item.title}</h4>
                  </Link>
                  <span loading="lazy">ERC-{item.code}</span>

                </div>
              </div>
            
            </div>
            
          ))}
          </Slider>
        
)}
      </div>
      </div>
      
      
    </section>
  );
};

export default HotCollections;
