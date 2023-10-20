import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import Skeleton from "../UI/Skeleton";

function HotCollections() {
  const [hotData, setHotData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getHotData() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setHotData(data);
    setLoading(false);
  }

  useEffect(() => {
    getHotData();
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
            {!loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton
                          className="skeleton-box"
                          width={"270px"}
                          height={"150px"}
                          borderRadius={"10px"}
                        />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton
                          className="skeleton-box"
                          width={"64px"}
                          height={"18px"}
                          borderRadius={"10px"}
                        />
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton
                          className="skeleton-box"
                          width={"54px"}
                          height={"18px"}
                          borderRadius={"10px"}
                        />
                      </div>
                    </div>
                  </div>
                ))
              : hotData.map((nft) => (
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
                            src={nft.nftImage}
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
        </div>
      </div>
    </section>
  );
}

export default HotCollections;
