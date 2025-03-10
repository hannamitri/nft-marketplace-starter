import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import collectionsData from "../../api/api.json";
import Carousel from "../shared/Carousel";
import Skeleton from "../UI/Skeleton";

const HotCollectionSkeleton = () => (
  <div className="skeleton-slide">
    <Skeleton type="image" className="skeleton-image" />
    <Skeleton
      type="avatar"
      className="skeleton-circle"
      style={{
        marginTop: "-20px",
        position: "relative",
        zIndex: 1,
        border: "2px solid white",
      }}
    />
    <Skeleton
      type="title"
      className="skeleton-title"
      style={{ marginTop: "10px" }}
    />
    <Skeleton
      type="subtitle"
      className="skeleton-subtitle"
      style={{ marginTop: "8px" }}
    />
  </div>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setCollections(collectionsData.slice(0, 6));
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
          <Carousel skeletonItem={HotCollectionSkeleton}>
            {collections.map((collection, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={collection.id}
              >
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
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
