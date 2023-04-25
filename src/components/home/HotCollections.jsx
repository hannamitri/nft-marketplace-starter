import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [userId, setUserId] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    hotCollection();
    setLoadingState(false);
  }, [loadingState]);

  async function hotCollection() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setUserId(data);
  }

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
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

          <ReactOwlCarousel
            className="navClass"
            {...options}
          >
            {loadingState ? (
              new Array(4).fill(0).map((_, index) => (
             <div className="nft_coll" key={index}>
                <div className="nft_wrap hotcollection__skeleton">
                </div>
                <div className="nft_coll_pp hotcollection__skeleton--author">
                </div>
                <div className="nft_coll_info nft__column">
                  <div className="hotcollection__skeleton--title"></div>
                  <div className="hotcollection__skeleton--code"></div>
                </div>
              </div>))) : (
              userId.map((user, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={user.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={user.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{user.title}</h4>
                    </Link>
                    <span>ERC-{user.code}</span>
                  </div>
                </div>
              ))
            )}
          </ReactOwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
