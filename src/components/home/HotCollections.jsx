import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Skeleton from '../UI/Skeleton'

const HotCollections = () => {
  const [collections, getCollections] = useState([]);
  const [loading, setLoading] = useState(undefined);
  const state = {
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };


  async function fetchPosts() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    getCollections(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
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
          {!loading ? (
            <OwlCarousel
              items={4}
              loop={true}
              nav={true}
              margin={12}
              responsive={state.responsive}
              smartSpeed={500}
            >
              {new Array(5).fill(0).map((_, index) => (
                <div className="item" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width={268} height={150} borderRadius={1} />
                    </div>
                    <div className="nft_coll_pp">
                      <div className="lazy pp-coll">
                        <Skeleton width={60} height={60} borderRadius={999} />
                      </div>

                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <h4>
                        <Skeleton width={120} height={20} borderRadius={1} />
                      </h4>

                      <span>
                        <Skeleton width={90} height={20} borderRadius={1} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )
         : 
                  
             (
            <OwlCarousel>
              {collections.map((collect) => (
                <div className="collect" key={collect.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/collect-details/${collect.nftId}`}>
                        <img
                          src={collect.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collect.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collect.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collect.title}</h4>
                      </Link>
                      <span>ERC-{collect.code}</span>
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
