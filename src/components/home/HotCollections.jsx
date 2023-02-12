import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactOwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton.jsx";

const HotCollections = () => {
  const [hotCollection, setHotCollection] = useState([]);

  useEffect(() => {
    async function getHotCollection() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotCollection(data);
    }
    getHotCollection();
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
          {/* className="col-lg-3 col-md-6 col-sm-6 col-xs-12" */}
          {hotCollection.length ? (
            <ReactOwlCarousel
              nav={true}
              margin={10}
              loop
              responsive={{
                0: {
                  items: 1
                },
                768: {
                  items: 2
                },
                1000: {
                  items: 3
                },
                1200: {
                  items: 4
                }
              }}
            >
              {hotCollection.map((collection) => (
                <div className="nft_coll" key={collection.id}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={collection.authorImage}
                        alt=""
                      />
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
              ))}
            </ReactOwlCarousel>
          ) : (
            <ReactOwlCarousel
              nav={true}
              margin={10}
              loop
              responsive={{
                0: {
                  items: 1
                },
                768: {
                  items: 2
                },
                1000: {
                  items: 3
                },
                1200: {
                  items: 4
                }
              }}
            >
              {new Array(6).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <Skeleton width="100%" height="100%" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/">
                      <Skeleton width="200px" height="20px" />
                    </Link>
                    <br />
                    <Skeleton width="100px" height="20px" />
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
