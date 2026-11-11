import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
        setData(response.data)
      } catch (error) {
        console.error("Error fetching hot collections data:", error);
      }
    }
    fetchData()
  }, [])

  const responsiveSettings = {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
    1200: {
      items: 4,
    }
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
          {data.length ? (
            <OwlCarousel className="owl-theme" responsive={responsiveSettings} items={4} loop margin={2} dots={false} mouseDrag={false} nav>
              {data.map((item, index) => (
                    <div className="nft_coll" key={index}>
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img src={item.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img className="lazy pp-coll" alt="" src={item.authorImage} />
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
                  ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel className="owl-theme" responsive={responsiveSettings} items={4} loop margin={2} dots={false} mouseDrag={false} nav>
                {new Array(8).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                        <Skeleton width="100%" height="200px" />
                    </div>
                    <div className="nft_coll_pp">
                        <Skeleton width="50px" height="50px" borderRadius="50%"
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
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default HotCollections;
