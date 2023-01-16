import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton"

const options = {
  items: 4,
  margin: 10,
  responsiveClass: true,
  nav: true,
  loop: true,
  dots: false,
  responsive: {
    1200: {
      items: 4,
    },
    1000: {
      items: 3,
    },
    575: {
      items: 2,
    },
    0: {
      items: 1
    }
  },
};

const HotCollections = () => {
  const [hotCollection, setHotCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchNFT() {
    setLoading(false);
    const response = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setHotCollection(response.data);
    setLoading(true);
  }

  useEffect(() => {
    fetchNFT();
  }, []);

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
            {loading ? (
          <OwlCarousel className={"owl-theme"} {...options}>
              <div>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton height={"100%"} width={"100%"}/>
                      <img
                        src=""
                        className="lazy img-fluid "
                        alt=""
                      />
                  </div>
                  <div className="nft_coll_pp">
                      <Skeleton width={"60px"} height={"60px"} borderRadius={"50%"}/>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info ">
                      <h4 className="nft_info_title">
                        <Skeleton width={"150px"} height={"20px"} />
                      </h4>
                    <span className="nft_info_id"> <Skeleton width={"80px"} height={"20px"}/></span>
                  </div>
                </div>
              </div>
          </OwlCarousel>
            ) : (
              <OwlCarousel className={"owl-theme"} {...options}>
              {hotCollection.map((hotCollection) => (
                <div key={hotCollection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={hotCollection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={hotCollection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{hotCollection.title}</h4>
                      </Link>
                      <span>{hotCollection.nftId}</span>
                    </div>
                  </div>
                </div>
              ))}
          </OwlCarousel>
            )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
