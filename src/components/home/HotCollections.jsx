import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MdOutlineKeyboardArrowRight
      className={className}
      style={{
        ...style,
        hoverscale: "10%",
        position: "absolute",
        zIndex: "1",
        right: "5",
        top: "55%",
        overflow: "hidden",
        display: "block",
        background: "white",
        border: "thin solid gray",
        color: "gray",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MdOutlineKeyboardArrowLeft
      className={className}
      style={{
        ...style,
        position: "absolute",
        zIndex: "1",
        left: "5",
        top: "55%",
        overflow: "hidden",
        display: "block",
        background: "white",
        border: "thin solid gray",
        color: "gray",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

const HotCollections = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); 



  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then(
        (response) => {
          setItems(response.data); 
          setLoading(false); 
      
        },
        (error) => {
          console.log(error);
          setLoading(false); 
        }
      );
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
          <Slider {...settings}>
            {items.map((item) => (
              <div className="relative" key={item.id}>
                
                <div className="nft_coll mx-2">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img src={item.nftImage} className={loading ? "grayed-out" : "lazy img-fill"} alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img className={loading ? "grayed-out" :"lazy pp-coll"} src={item.authorImage} alt="" />
                    </Link>
                    <i className={loading ?"grayed-out" : "fa fa-check"}></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4 className={loading ? "grayed-out" : "opacity-100"}>{item.title}</h4>
                    </Link>
                    <span className={loading ? "grayed-out" : "opacity-100"}>ERC-{item.code}</span>
                  </div>
                </div>
              </div>
              
        
            ))}
          </Slider>
      </div>
    </section>
  );
  };
  
  export default HotCollections;
