import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  


  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  const [hotCollection, setHotCollection] = useState([]);

  async function getHotCollectionData() {
    const hotCollectionsData = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);

    setHotCollection(hotCollectionsData.data);
  }
 
  
    getHotCollectionData();
    
 
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
          <OwlCarousel className="owl-theme" {...options}>
            {hotCollection.length ? 
            
            (
              hotCollection.map((item) => (
                <div className="nft_coll" key={item.id}>
                  <div className="nft_wrap">
                    <Link to="">
                      <img
                        src={item.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={item.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{item.title}</h4>
                    </Link>
                    <span>ERC-{item.code}</span>
                  </div>
                </div>
              )
              
              )  
             
            ) : (
              
              <>
              {new Array(6).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="200px" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton
                      width="50px"
                      height="50px"
                      borderRadius="50%"
                    />

                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton width="100px" height="20px" />

                    <br />
                    <Skeleton width="60px" height="20px" />
                  </div>
                </div>
              ))}
           </>            
              
            )
            
            }


          </OwlCarousel>
          
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
