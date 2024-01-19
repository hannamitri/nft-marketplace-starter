import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const urls = [
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    ];

    Promise.all(urls.map((url) => axios.get(url)))
      .then((responses) => {
        // Assuming each URL returns an array of collections
        const allData = responses.flatMap((res) => res.data);
        setCollections(allData);
      })
      .catch((error) => {
        console.error("There was an error fetching the collections:", error);
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
          {collections.map((collection) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={collection.id}
            >
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>ERC-{collection.code}</span>
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
