import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SimpleSlider from "../UI/SimpleSlider";

const hotCollectionsUrl =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getHotCollections() {
    setLoading(true);
    try {
      const { data } = await axios.get(hotCollectionsUrl);
      setHotCollections(data);
    } catch (error) {
      console.error("Error fetching hot collections:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHotCollections();
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
          <SimpleSlider>
            {loading
              ? 
                [1, 2, 3, 4].map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll nft_coll--skeleton">
                      <div className="nft_wrap nft_wrap--skeleton"></div>
                      <div className="nft_coll_pp nft_coll_pp--skeleton">
                        <div className="pp-coll pp-coll--skeleton"></div>
                      </div>
                      <div className="nft_coll_info nft_coll_info--skeleton">
                        <div className="nft_coll_title--skeleton"></div>
                        <div className="nft_coll_code--skeleton"></div>
                      </div>
                    </div>
                  </div>
                ))
              : hotCollections.map((collection, index) => (
                  <div key={index}>
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
                          <h4>{collection.name}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </SimpleSlider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
