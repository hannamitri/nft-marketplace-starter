import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCollections() {
    setLoading(false);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
    setLoading(true);
  }
  useEffect(() => {
    fetchCollections();
  }, []);

  const owlCarouselOptions = {
    item: 4,
    loop: true,
    nav: true,
    margin: 20,
    responsive: {
      0: {
        items: 1,
      },
      600: {
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

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <div
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="100"
              >
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
          </div>
          <OwlCarousel className="owl-carousel" {...owlCarouselOptions}>
            {loading
              ? new Array(6).fill(0).map((_, index) => (
                  <div className="item" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width={368} height={150} borderRadius={1} />
                      </div>
                      <div className="nft_coll_pp">
                        <div className="lazy pp-coll">
                          <Skeleton width={60} height={60} borderRadius={999} />
                        </div>
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
                ))
              : collections.slice(0, 6).map((collection, index) => (
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                  >
                    <div className="item" key={index}>
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
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
