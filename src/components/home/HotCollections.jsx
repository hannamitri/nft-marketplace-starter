import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "../UI/Carousel";
import Skeleton from "../UI/Skeleton";

const CollectionSkeleton = () => (
  <div className="hot-collection-slide">
    <div className="nft_coll">
      <Skeleton width="100%" height="200px" borderRadius="10px 10px 0 0" />

      <div className="nft_coll_pp">
        <Skeleton width="60px" height="60px" borderRadius="50%" />
      </div>

      <div className="nft_coll_info">
        <Skeleton width="100px" height="18px" borderRadius="4px" />
        <br />
        <Skeleton width="60px" height="16px" borderRadius="4px" />
      </div>
    </div>
  </div>
);

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
    .then(response => {
      setCollections(response.data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
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
          <div className="col-lg-12">
            <Carousel className="hot-collections-slider">
              {loading
                ? new Array(4)
                    .fill(null)
                    .map((_, index) => <CollectionSkeleton key={index} />)
                : collections.map((collection) => (
                    <div className="hot-collection-slide" key={collection.id}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={collection.nftImage}
                              className="lazy img-fluid"
                              alt={collection.title}
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
      </div>
    </section>
  );
};

export default HotCollections;
