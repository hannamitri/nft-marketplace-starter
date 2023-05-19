import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../css/styles/style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const API__URL = `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`;

const HotCollections = () => {
  const [nftInfo, setNftInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const skeletonArray = Array(4).fill(null);

  async function hotCollectionsData() {
    try {
      const response = await axios.get(`${API__URL}`);
      setNftInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    hotCollectionsData();
  }, []);

  const carouselResponsive = {
    0: {
      items: 1,
    },
    550: {
      items: 2,
    },
    1024: {
      items: 3,
    },
    1400: {
      items: 4,
    },
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
          <div className="carousel-container">
            {isLoading && (
              <>
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                dots={false}
                responsive={carouselResponsive}
                nav
                >
                {skeletonArray.map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width={500} height={1000} />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton width={50} height={50} borderRadius={99} />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <h4>
                          <Skeleton height={20} width="40%"/>
                        </h4>
                        <span>
                          <Skeleton height={20} width="20%" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </ OwlCarousel>
              </>
            )}
              
            {!isLoading && (
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                dots={false}
                responsive={carouselResponsive}
                nav
              >
                {nftInfo.map((nft) => (
                  <div key={nft.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={nft.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={nft.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{nft.title}</h4>
                        </Link>
                        <span>ERC-{nft.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
  
};


export default HotCollections;
