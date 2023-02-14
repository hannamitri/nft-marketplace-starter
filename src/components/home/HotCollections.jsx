import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HotCollections = () => {
  const [nftsList, setNftsList] = useState([]);

  async function getNfts() {
    await axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((res) => setNftsList(res.data));
  }

  useEffect(() => {
    getNfts();
  });

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
          {nftsList.map((nft) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${nft.nftId}`}>
                    <img src={nft.nftImage} className="lazy img-fluid" alt="" />
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
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
