import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

function HotCollections() {
  const [hotData, setHotData] = useState([]);
  const [loading, setLoading] = useState(false);

  function getHotData() {
    setLoading(true);
    const { data } = axios.get(
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
          {!loading
            ? hotData.map((nft) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
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
                        ``
                        <img
                          className="lazy pp-coll"
                          src={nft.AuthorImage}
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
              ))
            : new Array(4).fill(0).map((_, index) => 
            <div key={index}>
              Hi
            </div>
            )}
        </div>
      </div>
    </section>
  );
}

export default HotCollections;
