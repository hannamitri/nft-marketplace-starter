import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
// API Link https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  //connecting to API
  useEffect(() => {
    console.log("fetching...");
    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    )
      .then((res) => {
        console.log("got response: ", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("got data", data);
        setCollections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoading(false);
      });
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
            <OwlCarousel
              key="Loading"
              className="owl-theme"
              loop
              margin={10}
              nav
            >
              {new Array(4).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <div className="skeleton skeleton-img" />
                  </div>
                  <div className="nft_coll_pp">
                    <div className="skeleton skeleton-avatar" />
                  </div>
                  <div className="nft_coll_info">
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text-sm" />
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <div data-aos="zoom-in-up" data-aos-duration="1200">
              <OwlCarousel
                key="Loaded"
                className="owl-theme"
                loop
                margin={10}
                nav
              >
                {collections.map((item) => (
                  <div className="nft_coll" key={item.id}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
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
                          alt={item.authorName}
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
