import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHotCollections } from "../../api/api";
import ResponsiveSlider from "./ResponsiveSlider";
import SkeletonLoader from "./SkeletonLoader";
export const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await getHotCollections();
      setCollections(data);
      setLoading(false);
    };

    fetchCollections();
  }, []);

  if (loading) {
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
            <ResponsiveSlider>
              {[...Array(4)].map((_, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                  <SkeletonLoader />
                </div>
              ))}
            </ResponsiveSlider>
          </div>
        </div>
      </section>
    );
  }

  if (collections.length === 0) {
    return <div>No collections available.</div>;
  }

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
          <div className="responsive-slider-container">
          <ResponsiveSlider>
            {collections.map((collection, index) => {
              return (
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="nft_coll">
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
              </div>
              );
            })}
        </ResponsiveSlider>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
