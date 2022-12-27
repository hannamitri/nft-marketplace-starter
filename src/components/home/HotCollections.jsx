import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel"

function HotCollections() {
  const [collections, setCollections] = useState(
    JSON.parse(localStorage.getItem("collections")) || []
  );
  const [loading, setLoading] = useState()
  

  useEffect(() => {
    async function fetchCollections() {
      setLoading(true)
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
      setCollections(data)
      setLoading(false)
    }
    fetchCollections()
  }, [])

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(collections));
  }, [collections]);

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
          {
            loading ?(
              <div className="item">
                <div className="nft_coll">
                  <div className="nft__wrap">
                    <div className="skeleton-box"></div>
                  </div>
                </div>
              </div>
            ) : (
          <OwlCarousel className="owl-theme" loop margin={10} items="4" nav slideBy={1}>
            {collections.map((collection, index) => (
              <div className="item" key={index}>
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
                    <span>ERC - {collection.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default memo(HotCollections);
