import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import { Link } from "react-router-dom";

const HotCollections = () => {
  const [hotCollectionData, setHotCollectionData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setHotCollectionData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchHotCollections();
  }, [hotCollectionData.length]);

  const responsiveCarousel = {
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      800: {
        items: 3,
      },
      1200: {
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
          {loading ? (
            <OwlCarousel
              className="owl-theme"
              loop
              dots={false}
              margin={10}
              nav
              {...responsiveCarousel}
            >
              {new Array(6).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <div className="nft_skeleton nft_skeleton_image lazy img-fluid"></div>
                    </div>
                    <div className="nft_coll_pp">
                      <div className="nft_skeleton nft_skeleton_author lazy pp-coll"></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <div className="nft_skeleton nft_skeleton_title"></div>
                      <div className="nft_skeleton nft_skeleton_code"></div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel
              className="owl-theme"
              loop
              dots={false}
              margin={10}
              nav
              {...responsiveCarousel}
            >
              {hotCollectionData.map((nft) => (
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
    </section>
  );
};

export default HotCollections;