import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [hotNFTs, setHotNFTs] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchHotNFTs() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setHotNFTs(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchHotNFTs();
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
          {hotNFTs.length > 0 && !loading ? (
            <OwlCarousel
              className="owl-theme"
              items={4}
              loop
              margin={10}
              nav
              dots={false}
              responsive={{
                0: { items: 1 },
                500: { items: 2 },
                768: { items: 3 },
                1000: { items: 4 },
              }}
            >
              {hotNFTs.map((nft, index) => (
                <div
                  // className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
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
          ) : (
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="100%" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton width={60} height={60} borderRadius={9999} />
                  </div>
                  <div className="nft_coll_info">
                    <h4>
                      <Skeleton width="40%" height={20} borderRadius={5} />
                    </h4>
                    <span>
                      <Skeleton width="25%" height={15} borderRadius={5} />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
