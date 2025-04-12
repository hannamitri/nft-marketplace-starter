import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SimpleSlider from "../../pages/Slider";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHotCollections() {
    
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setLoading(false);
    setHotCollections(response.data);
  }

  useEffect(() => {
    fetchHotCollections();
  }, [fetchHotCollections]);

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

          {loading ? (
            <SimpleSlider>
              {/* mapping */}
              {new Array(4).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="100%" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton width={60} height={60} borderRadius={100} />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <h4>
                      <Skeleton height={20} width="40%" />
                    </h4>
                    <span>
                      <Skeleton height={20} width="20%" />
                    </span>
                  </div>
                </div>
              ))}
            </SimpleSlider>
          ) : (
            <SimpleSlider>
              {hotCollections.map((hotCollection, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to="/item-details/:nftId">
                      <img
                        src={hotCollection.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={hotCollection.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{hotCollection.title}</h4>
                    </Link>
                    <span>{hotCollection.code}</span>
                  </div>
                </div>
              ))}
            </SimpleSlider>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
