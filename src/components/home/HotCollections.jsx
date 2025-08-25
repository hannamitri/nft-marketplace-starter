import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
        );
        setCollections(data);
      } catch (err) {
        console.error("Error fetching hot collections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const options = {
    items: 4,
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: false,
    slideBy: 1,
    navText: ["‹", "›"],
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 4 },
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
            new Array(4).fill(0).map((_, i) => (
              <div key={i} className="col-md-3 mb-4">
                <div className="card placeholder-glow">
                  <div
                    className="card-img-top placeholder"
                    style={{ height: "200px" }}
                  ></div>
                  <div className="card-body text-center">
                    <div className="mb-2">
                      <span className="placeholder rounded-circle col-4"></span>
                    </div>
                    <h5 className="card-title">
                      <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text">
                      <span className="placeholder col-4"></span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <OwlCarousel className="owl-theme" {...options}>
              {collections.map((item, index) => (
                <div className="gap-4" key={item.id || index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.id}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt={item.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt={item.author}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/explore/${item.id}`}>
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
