import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import {useEffect, useState} from "react";
import Slider from "react-slick";
import Timer from "../Timer.jsx"
import Internship from "../Internship.jsx"
import AOS from 'aos';
import 'aos/dist/aos.css'; 
const NewItems = () => {
const [items,setItems]=useState([]);
const [loading,setLoading]= useState(true);
const fetchItems=async()=>{
  try{
  const response=await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
  setItems(response.data);
  console.log(response.data)
}
catch(error)
{
  console.error("Error fetching new items:", error);
}

finally{
  setLoading(false);
}};
useEffect(()=>{
   const timer=setTimeout(() => {
     fetchItems();
  }, 2000);
 return ()=> clearTimeout(timer);
},[]);
useEffect(() => {
    AOS.init({
    duration: 1000,
  })},[]);
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:true,
    lazyLoad:"ondemand",
    responsive:[{
      breakpoint:768,
      settings:{
        slidesToShow:2,
        slidesToScroll:1
      }
      
    },
      
      {
      breakpoint:480,
      settings:{
        slidesToShow:1,
        slidesToScroll:1
      }
    }]
  };
  
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12 slider-container">
            
            {loading ?(
              <div className="row">
                        <Slider {...settings}>
                            {new Array(4).fill(0).map((_, index)=>(
            <div key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
<div className="skeleton skeleton-author"></div>
                </div>
               
                  <div className="skeleton skeleton-count"> 
                    
</div>
                <div className="nft__item_wrap">
<div className="skeleton skeleton-image"></div>
                </div>
                <div className="nft__item_info">
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-price"></div>
                   <div className="skeleton skeleton-likes"></div>
                  </div>
</div>
</div>
            ))}
             </Slider>
            </div>
            ):(
            <Slider {...settings}>

          {items.map((item, index) => (
            <div data-aos="fade-up">
< Internship key={item.nftId||index}
item={item}
index={index}/>
                </div>
                 
          ))}
          </Slider>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
