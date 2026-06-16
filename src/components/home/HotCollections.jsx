import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  async function getCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    );
    return data;
  }

  useEffect(() => {
    async function load() {
      const results = await getCollections();
      setCollections(results);
      setLoading(false);
    }
    load();
  }, []);

  // Only delay Owl mounting, NOT the whole component
  useEffect(() => {
    if (!loading) {
      setReady(true);
    }
  }, [loading]);

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
          {ready ? (
            <ReactOwlCarousel
              className="owl-theme"
              loop
              margin={10}
              nav
              responsive={{
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 4 },
              }}
            >
              {loading
                ? new Array(5).fill(0).map((_, i) => (
                    <div className="item" key={i}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Skeleton width="100%" height="200px" />
                        </div>

                        <div className="nft_coll_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                          <i className="fa fa-check"></i>
                        </div>

                        <div className="nft_coll_info">
                          <Skeleton width="100px" height="20px" />
                          <br />
                          <Skeleton width="60px" height="20px" />
                        </div>
                      </div>
                    </div>
                  ))
                : collections.slice(0, 6).map((collection) => (
                    <div className="item" key={collection.id}>
                      <div className="nft_coll">
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
                    </div>
                  ))}
            </ReactOwlCarousel>
          ) : (
            <div className="row">
              <ReactOwlCarousel
                className="owl-theme"
                loop
                margin={10}
                nav
                responsive={{
                  0: { items: 1 },
                  600: { items: 2 },
                  1000: { items: 4 },
                }}
              >
                {new Array(5).fill(0).map((_, i) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ width: "100%", maxWidth: "100%", padding: "0" }} key={i}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width="100%" height="200px" />
                      </div>

                      <div className="nft_coll_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Skeleton width="100px" height="20px" />
                        <br />
                        <Skeleton width="60px" height="20px" />
                      </div>
                    </div>
                  </div>
                ))}
              </ReactOwlCarousel>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
