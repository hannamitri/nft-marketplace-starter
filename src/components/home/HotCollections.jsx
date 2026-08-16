import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import owlTheme from "../../css/styles/owl.theme.css";
import owlCarousel from "../../css/styles/owl.carousel.css";
import owlTransitions from "../../css/styles/owl.transitions.css";
import $ from "jquery";
window.$ = $;
window.jQuery = $;

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
  // const { id } = useParams();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(API_URL);
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setCollections(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true, // arrows to click
    dots: true, // dots to click
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 },
      1200: { items: 4 },
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
            <OwlCarousel key="skeleton" className="owl-theme" {...options}>
              {new Array(4).fill(0).map((_, index) => (
                <div className="skeleton-item" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap skeleton skeleton-image" />
                    <div className="nft_coll_pp">
                      <div className="skeleton skeleton-avatar" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <div className="skeleton skeleton-title" />
                      <div className="skeleton skeleton-subtitle" />
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            collections.length > 0 && (
              <OwlCarousel className="owl-theme" {...options}>
                {collections.map((item) => (
                  <div className="item" key={item.id}>
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
                        <Link to={`/author/${item.authorId}`}>
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
                        <span>{`ERC-${item.code}`}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

