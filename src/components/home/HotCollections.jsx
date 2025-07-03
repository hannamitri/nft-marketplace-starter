import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const HotCollections = () => {
  const [userData,setUserData]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
   fetchData();
  }, []);
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">              
              <h2>Hot Collections</h2>
            </div>
          </div>
            <OwlCarousel className=""  key={userData.length}  loop margin={10} nav items={4}>
          { userData.map((HotColl) => (
             <div key={HotColl.id} id={HotColl.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details" state={HotColl.nftId
}>

                    <img src={HotColl.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={HotColl.authorImage}alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{HotColl.title}</h4>
                  </Link>
                  <span>ERC-{HotColl.code}</span>
                </div>
                
              </div>
              
            </div>
            
          ))}
          </OwlCarousel>
    

        </div>
      </div>   
      
    </section>
  );
};

export default HotCollections;
