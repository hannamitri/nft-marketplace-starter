import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  async function fetchHotCollections() {
    const {data} = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
    setHotCollections(data);
  }

  useEffect(() => {
      fetchHotCollections();
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
          {hotCollections.map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={hotCollections[index].nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={hotCollections[index].authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{hotCollections[index].title}</h4>
                  </Link>
                  <span>ERC-{hotCollections[index].code}</span>
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
