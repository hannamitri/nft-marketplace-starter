import React, { useEffect, useState, Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";


const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{                  
        ...style,
        display: "block", 
        background: "#000 ",
        color: "#fff",
        scale: "3.0",
        borderRadius: "50%",
        right: "-10px", // Adjust positioning
        zIndex: 1,
      }}
      onClick={onClick}                                    
    />
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={ `slick-prev ${className}`}
      style={{
        ...style,
        display: "block",
        background: "#000",
        scale: "3.0",
        borderRadius: "50%",
        left: "-10px", // Adjust positioning
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
};




const HotCollections = () => {
const [collection, setCollection] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
const fetchCollection = async () => {
  try{
    const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
    const data = await response.json();
    setCollection(data);
  }
    catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    };
  };
  fetchCollection();
}, []);

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <CustomNextArrow />, // Use custom next arrow
  prevArrow: <CustomPrevArrow />, // Use custom previous arrow
  responsive: [
    {
      breakpoint: 768, // Adjust for tablets
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480, // Adjust for mobile
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};


if (loading) {
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
              {Array(5).fill(null).map((_, index) => (
                <div key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="200px" borderRadius="10px" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="80%" height="20px" />
                      <Skeleton width="40%" height="15px" />
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
          { collection.map((collection,index ) => (
              <div key={collection.id || index}>
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
