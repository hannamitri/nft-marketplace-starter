import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collectionsData, setCollectionsData] = useState([]);

  const owlCarouselOptions = {
    nav: true,
    loop: true,
    items: "4",
    dots: false,
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },

      768: {
        items: 3,
      },
      1080: {
        items: 4,
      },
    },
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollectionsData(data);
    }

    fetchData();
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
          {false ? (
            <OwlCarousel className="owl-theme" {...owlCarouselOptions}>
              {collectionsData.map((elem) => (
                <div className="nft_coll item" key={elem.id}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${elem.nftId}`}>
                      <img
                        src={elem.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${elem.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={elem.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{elem.title}</h4>
                    </Link>
                    <span>ERC-{elem.code}</span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="owl-theme" {...owlCarouselOptions}>
              {new Array(5).fill(0).map((_, index) => (
                  <div className="nft_coll nft__coll--skeleton" key={index}>
                    <div className="nft_wrap lazy nft_wrap--skeleton skeleton-box"></div>
                    <div className="nft_coll_pp">
                      <div className="lazy pp-coll pp__coll--skeleton skeleton-box"></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info nft_coll_info--skeleton">
                      <h4 className="skeleton-box"></h4>
                      <span className="skeleton-box"></span>
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
