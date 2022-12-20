import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HotCollections = () => {
  const [data, setData] = useState();
  useEffect(() => {
    axios({
      url: "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections ",
      method: "GET",
      dataResponse: "json",
    }).then((response) => {
      setData(response.data);
    });
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
          {data.map((obj) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={obj.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img
                      src={obj.nftImage}
                      className="lazy img-fluid"
                      alt="nftimage"
                    />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img
                      className="lazy pp-coll"
                      src={obj.authorImage}
                      alt="author img"
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{obj.title}</h4>
                  </Link>
                  <span>ERC- {obj.code}</span>
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
