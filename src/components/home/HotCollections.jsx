import axios from "axios";
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const carouselOptions = {
  className: "owl-theme",
  loop: true,
  margin: 30,
  nav: true,
  dots: false,
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

const skeletonCarouselOptions = {
  ...carouselOptions,
  loop: false,
  nav: false,
  mouseDrag: false,
  touchDrag: false,
};

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotCollections() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        setHotCollections(data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch hot collections:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div className="col-lg-12" data-aos="fade-up">
              <OwlCarousel key="hot-collections-loading" {...skeletonCarouselOptions}>
                {new Array(6).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="200px" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="70%" height="18px" />
                      <Skeleton width="45%" height="14px" />
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          ) : (
            <div className="col-lg-12" data-aos="fade-up">
              <OwlCarousel key="hot-collections-loaded" {...carouselOptions}>
                {hotCollections.map((collection) => (
                  <div className="nft_coll" key={collection.id}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
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
                ))}
              </OwlCarousel>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
