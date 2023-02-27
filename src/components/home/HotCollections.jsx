import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import "aos/dist/aos.css";


const HotCollections = () => {

  const [collections, setCollections] = useState([])

  const options = {
    loop: true,
    margin: 10,
    nav: true,
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

  async function getCollections() {
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setCollections(data)
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

          { collections.length>0 ? (
          <OwlCarousel className="owl-theme"         
          data-aos="fade-in"
          data-aos-duration="1000"
          {...options}>
              {collections.map((item, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${item?.nftId}`}>
                      <img src={item?.nftImage} className="lazy img-fluid" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${item?.authorId}`}>
                      <img src={item?.authorImage} className="lazy pp-coll"/>
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{item?.title}</h4>
                    </Link>
                    <span>ERC-{item?.code}</span>
                  </div>
                </div>
              ))}
              </OwlCarousel>
          ) : (
            <>
            <OwlCarousel className="owl-theme" 
            data-aos="fade-in"
            data-aos-duration="1000"
            {...options}>
            {new Array(6).fill(0).map((_, index) => (
              <div className="nfr_coll" key={index}>
                <div className="nft_wrap">
                      <Link to={``}>
                        <Skeleton width="100%" height="200px" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={``}>
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="">
                        <Skeleton width="100px" height="20px" />
                      </Link>
                      <br />
                      <Skeleton width="60px" height="20px" />
                    </div>
              </div>
            ))}
            </OwlCarousel> 
          </>
          )
        }
          


        </div>
      </div>
    </section>
  );
};

export default HotCollections;
