import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
    setLoading(false);
  }

  useEffect(() => {
    getCollections();
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
          <Splide
            options={{
              perPage: 4,
              breakpoints: {
                1400: {
                  perPage: 3,
                },
                995: {
                  perPage: 2,
                },
                770: {
                  perPage: 1,
                },
              },
              type: "loop",
              perMove: 1,
              pagination: false,
              focus: 0,
            }}
          >
            {collections.map(
              (
                { authorId, authorImage, code, id, nftId, nftImage, title },
                index
              ) => (
                <SplideSlide>
                  {loading ? (
                    <Skeleton
                      width="18.5rem"
                      height="300px"
                      borderRadius="20px"
                    />
                  ) : (
                    <div
                      data-aos=""
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <div className="nft_coll" style={{ width: "18.5rem" }}>
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{title}</h4>
                          </Link>
                          <span>ERC-{code}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </SplideSlide>
              )
            )}
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
