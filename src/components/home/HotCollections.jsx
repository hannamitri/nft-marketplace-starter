import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";



const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotCollections(data);
    }
    getData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-in">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {hotCollections.length ? (
            <OwlCarousel
              margin={10}
              loop
              nav={true}
              responsive={{
                0: {
                  items: 1,
                },
                768: {
                  items: 2,
                },
                1000: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              }}
            >
              {hotCollections.map((collection) => (
                <div className="nft_coll" key={collection.id}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${collection.nftId}`}>
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${collection.authorId}`}>
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
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel
                margin={10}
                loop
                nav={true}
                responsive={{
                  0: {
                    items: 1,
                  },
                  768: {
                    items: 2,
                  },
                  1000: {
                    items: 3,
                  },
                  1200: {
                    items: 4,
                  },
                }}
              >
                {new Array(6).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <a href="/">
                        <Skeleton width="100%" height="200px" />
                      </a>
                    </div>
                    <div className="nft_coll_pp">
                      <a href="/">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </a>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <a href="/">
                        <Skeleton width="100px" height="20px" />
                      </a>
                      <br />
                      <Skeleton width="60px" height="20px" />
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
