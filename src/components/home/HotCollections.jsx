import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotCollections = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching hot collections:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadCollections = async () => {
      const data = await fetchHotCollections();
      if (data) {
        setTimeout(() => {
          setCollections(data);
          setLoading(false);
        }, 2000);
      }
    };
    loadCollections();
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-4">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          {collections.length > 0 ? (
            <ReactOwlCarousel className="owl-theme" {...options}>
              {collections.map((collection, index) => (
                <div className="item" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage || nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author?author=${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage || AuthorImage}
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
              ))}
            </ReactOwlCarousel>
          ) : (
            <div className="row">
              {[...Array(4)].map((_, idx) => (
                <div className="item col-lg-3 col-md-6 col-sm-6 mb-4" key={idx}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <div
                        className="skeleton-box"
                        style={{ height: 200, width: "100%", borderRadius: 10 }}
                      />
                    </div>
                    <div className="nft_coll_pp" style={{ marginTop: -20 }}>
                      <div
                        className="skeleton-box"
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          border: "4px solid #fff",
                        }}
                      />
                    </div>
                    <div className="nft_coll_info mt-3">
                      <div
                        className="skeleton-box"
                        style={{ width: "60%", height: 20, marginBottom: 10 }}
                      />
                      <br/>
                      <div
                        className="skeleton-box"
                        style={{ width: "10%", height: 14 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;