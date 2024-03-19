import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomSlider from "./CustomSlider";
import "../../css/styles/btn.css";
import FetchData from "./FetchData";


const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
  // const [loading, setLoading] = useState(true);
  // const [userData, setUserData] = useState([]);

 // Deleted Fetch funktion

  return (
    <FetchData apiUrl={API_URL}>
      {(newItems) => (
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
              {newItems.map((item, index) => (
                    <div
                      className="col-lg-3 col-md-8 col-sm-10 col-xs-12"
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
                          <Link to={`/author/${item.authorId}`} >
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
    )}
    </FetchData>
  );
};

export default HotCollections;
