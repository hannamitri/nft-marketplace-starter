
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotCollections.css";




  // your existing JSX stays down here

const HotCollections = () => {
const [hotCollections, setHotCollections] = useState([]);
const [loading, setLoading] = useState(true);
async function fetchHotCollections() {
  const response = await fetch(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
  );
  const data = await response.json();
console.log(data);
setHotCollections(data);

  
}

useEffect(() => {
  fetchHotCollections();
}, []);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
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
              <h2 data-aos="zoom-in" data-aos-duration="700">
                Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>


         
         
         
        
      <Slider {...settings} className="hot-collections-slider">
          {hotCollections.map((collection, index) => (
            
              <div className="nft_coll" key={index}>
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.nftImage} />
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
                  <span>{collection.code}</span>
                </div>
              </div>
             
     
          ))} 
     </Slider>
        </div>
      </div>
      
    </section>
  );
};


export default HotCollections;





