import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import axios from "axios";
import { Link } from "react-router-dom";
import HotSkeleton from "../UI/HotSkeleton";

const HotCollections = () => {
  const [hotCollectionsData, setHotCollectionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHotCollections() {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setHotCollectionsData(response.data);
        
      } catch (error) {
        setError(error.message);
      } 
    }
    setLoading(false);
    fetchHotCollections();
  }, []);

  if (error) return <p>Error: {error}</p>;

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
            <OwlCarousel
              className="owl-theme"
              items={4}
              loop
              margin={30}
              nav
              dotsEach
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
                1400: {
                  items: 4,
                },
              }}
            >
              <HotSkeleton />
            </OwlCarousel>
          ) : (
            <OwlCarousel
              className="owl-theme"
              items={4}
              loop
              margin={1}
              nav
              dotsEach
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
                1400: {
                  items: 4,
                },
              }}
            >
              {hotCollectionsData.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
