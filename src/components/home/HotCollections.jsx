import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const carouselOptions = {
  className: "owl-theme",
  loop: true,
  nav: true,
  dots: false,
  margin: 8,
  navText: ["<", ">"],
  responsive: {
    0: { items: 1 },
    572: { items: 2 },
    992: { items: 3 },
    1200: { items: 4 },
  },
};

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHotCollections() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotCollections(data);
      setLoading(false);
    } catch {
      setLoading(false);
      console.error("There was an error fetching the hot collections");
    }
  }

  useEffect(() => {
    fetchHotCollections();
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
            {loading ? (
              new Array(4).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <div className="skeleton carousel__image--skeleton"></div>
                    </div>
                    <div className="nft_coll_pp">
                      <div className="skeleton pp-coll carousel__authorImage--skeleton "></div>
                    </div>
                    <div className="nft_coll_info">
                      <div className="skeleton carousel__title--skeleton"></div>
                      <div className="skeleton carousel__id--skeleton"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <OwlCarousel {...carouselOptions}>
                {hotCollections.map(({ nftId, authorId, authorImage, nftImage, title, code }) => (
                  <div
                    key={nftId}
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    style={{ width: "100%", maxWidth: "100%", padding: "0" }}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${nftId}`}>
                          <img src={nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${authorId}`}>
                          <img className="lazy pp-coll" src={authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{title}</h4>
                        </Link>
                        <span>ERC-{code}</span>
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
