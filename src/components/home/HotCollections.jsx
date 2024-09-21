import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";


const HotCollections = () => {
  const [hotCollectoins, setHotCollections] = useState([]);
  const [loading, setLoading] = useState();

  const options = {
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 1,
      },
      800: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },

    dots: false,
    items: 4,
    nav: true,
  };

  async function getHotCollections() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
  
    setHotCollections(data);
    setLoading(false);
  }

  useEffect(() => {
    getHotCollections();
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
            <div className="horizontal_divItems">
              <button class="btn__left--skeleton">&lt;</button>
              {new Array(4).fill(0).map((element, index) => (
                <div className="owl-carousel--skeleton" key={index}>
                  <div className="nft_coll--skeleton">
                    <div className="nft_wrap--skeleton" />
                    <div className="nft_coll_pp--skeleton">
                      <img className="lazy pp-coll--skeleton" alt="" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info--skeleton">
                      <div className="nft_coll_info--skeleton--title" />
                      <div className="nft_coll_info--skeleton--code" />
                    </div>
                  </div>
                </div>
              ))}
              <button class="btn__right--skeleton">&gt;</button>
            </div>
          ) : (
            <OwlCarousel
              className="owl-theme owl-nav"
              loop
              margin={10}
              {...options}
            >
              {hotCollectoins.map((hotCollection) => (
                <div
                  className="owl-carousel owl-loaded owl-drag"
                  key={hotCollection.id}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={{ pathname: `/item-details/${hotCollection.nftId}`, state: hotCollection.nftId}}>
                        <img
                          src={hotCollection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link  to={{ pathname: `/author/${hotCollection.authorId}`, state: hotCollection.authorId}}>
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
                      <span>ERC-{hotCollection.code}</span>
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
