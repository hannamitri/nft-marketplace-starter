import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CustomSlider from "./CustomSlider";
import "../../css/styles/btn.css";
import "../../css/styles/skeleton.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setUserData(data);
    setLoading(false);
  };
  useEffect(() => {
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
          <div className="slider-container">
            <CustomSlider>
              {loading
                ? [1, 2, 3, 4].map((index) => (
                    <div
                      className="col-lg col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap skeleton-wrap">
                          <div className="skeleton-img"></div>
                        </div>
                        <div className="nft_coll_pp">
                          <div className="skeleton-avatar"></div>
                        </div>
                        <div className="nft_coll_info">
                          <div className="skeleton-text"></div>
                          <div className="skeleton-text"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : userData.map((item, index) => (
                    <div
                      className="col-lg col-md-12 col-sm-12 col-xs-12"
                      key={index}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${item.authorId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage}
                              alt=""
                            />
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
                    </div>
                  ))}
            </CustomSlider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
