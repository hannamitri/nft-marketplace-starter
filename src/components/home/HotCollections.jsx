import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

import Carousel from "./Carousel";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then(({ data }) => {
        if (active) {
          setCollections(data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch collections:", error);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const showPlaceholders = loading || collections.length === 0;

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

          <div className="col-lg-12">
            <Carousel key={showPlaceholders ? "loading" : "loaded"}>
              {showPlaceholders
                ? Array.from({ length: 8 }, (_, index) => (
                    <div className="item" key={index}>
                      <div className="nft_coll skeleton-card">
                        <div className="nft_wrap">
                          <div className="skeleton skeleton-image"></div>
                        </div>

                        <div className="nft_coll_pp">
                          <div className="skeleton skeleton-avatar"></div>
                          <i className="fa fa-check"></i>
                        </div>

                        <div className="nft_coll_info">
                          <div className="skeleton skeleton-title"></div>
                          <div className="skeleton skeleton-subtitle"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : collections.map((collection, index) => (
                    <div
                      className="item"
                      key={collection.id ?? index}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={collection.nftImage || nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="nft_coll_pp">
                          <Link to="/author" onClick={collection.authorId}>
                            <img
                              className="lazy pp-coll"
                              src={collection.authorImage || AuthorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>

                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{collection.title}</h4>
                          </Link>

                          <span>
                            {collection.code
                              ? `ERC-${collection.code}`
                              : "ERC-192"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;