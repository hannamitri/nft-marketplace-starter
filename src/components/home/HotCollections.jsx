import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fetchPosts = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
      );
      setHotCollections(fetchPosts.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const carouselSettings = {
    className: "owl-theme",
    items: 4,
    margin: 10,
    loop: true,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 },
    },
  };

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
            <div className="row">
              <OwlCarousel className="owl-theme" {...carouselSettings}>
                {[1, 2, 3, 4].map((item) => (
                  <div key={item}>
                    <div className="nft_coll">
                      <div className="skeleton-box skeleton-image"></div>
                      <div className="nft_coll_pp skeleton-box skeleton-avatar"></div>
                      <div className="nft_coll_info">
                        <div className="skeleton-box skeleton-title"></div>
                        <div className="skeleton-box skeleton-code"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          ) : (
            <OwlCarousel className="owl-theme" {...carouselSettings}>
              {hotCollections.map((index) => (
                <div key={index.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${index.nftId}`}>
                        <img
                          src={index.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${index.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={index.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{index.title}</h4>
                      </Link>
                      <span>ERC-{index.code}</span>
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
