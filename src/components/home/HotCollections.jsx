import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SkeletonCard from "../skeletons/SkeletonCard";


const HotCollections = () => {

const [collections, setCollections] = useState([])
const [loading, setLoading] = useState(true)
const API_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"

useEffect(()=>{
  const fetchCollections = async ()=> {
    try{
      const {data} = await axios.get(API_URL)
      setCollections(data)
    }catch (error){
      console.error("error fetching Hot Collections:", error)
    } finally {
      setLoading(false)
    }
  }
  fetchCollections()
}, [])


const settings = {
  dots: false, 
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings:{
        slidesToShow: 3,

      }

    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]

}

  return (
    <section data-aos="fade-up" id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          </div>
         <div className="hot-collections-slider mt-4">
          {loading ? (
            <div className="skeleton-wrapper">
              {[1, 2, 3, 4].map((i) => (
                <div className="skeleton-card" key={i}>
                  <div className="skeleton-img"></div>
                  <div className="skeleton-author"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-code"></div>
                </div>
              ))}
            </div>
          ) : (
          <Slider {...settings}>
          {collections.map((item, index) => (
            <div  key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.nftId ?? item.id}`}>
                    <img src={item.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img className="lazy pp-coll" src={item.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{item.title}</h4>
                  </Link>
                  <span>ERC - {item.code}</span>
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
