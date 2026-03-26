import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";

// Owl Carousel CSS
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    )
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          console.log("hotCollections data:", data);
          setCollections(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to load hotCollections", err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Owl Carousel options (responsive)
  const owlOptions = {
    loop: true,
    margin: 16,
    nav: true,
    dots: false,
    autoplay: false, // set true if you want autoplay
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 600,
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };

  // Simple skeleton card
  const SkeletonCard = () => (
    <div className="nft_coll">
      <div className="nft_wrap">
        <div
          style={{
            width: "100%",
            paddingTop: "75%",
            borderRadius: "8px",
            background: "linear-gradient(90deg,#eee 25%,#f5f5f5 37%,#eee 63%)",
            backgroundSize: "400% 100%",
            animation: "skeleton-loading 1.4s ease infinite",
          }}
        />
      </div>

      <div className="nft_coll_pp" style={{ marginTop: "-20px" }}>
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background:
              "linear-gradient(90deg,#eee 25%,#f5f5f5 37%,#eee 63%)",
            backgroundSize: "400% 100%",
            animation: "skeleton-loading 1.4s ease infinite",
          }}
        />
      </div>

      <div className="nft_coll_info">
        <div
          style={{
            width: "70%",
            height: "16px",
            marginBottom: "8px",
            background:
              "linear-gradient(90deg,#eee 25%,#f5f5f5 37%,#eee 63%)",
            backgroundSize: "400% 100%",
            animation: "skeleton-loading 1.4s ease infinite",
          }}
        />
        <div
          style={{
            width: "40%",
            height: "12px",
            background:
              "linear-gradient(90deg,#eee 25%,#f5f5f5 37%,#eee 63%)",
            backgroundSize: "400% 100%",
            animation: "skeleton-loading 1.4s ease infinite",
          }}
        />
      </div>
    </div>
  );

  return (
    <section id="section-collections" className="no-bottom">
      {/* Skeleton animation keyframes */}
      <style>
        {`
          @keyframes skeleton-loading {
            0% { background-position: 100% 0; }
            100% { background-position: -100% 0; }
          }
        `}
      </style>

      <div className="container">
        <div className="row">
          {/* Header */}
          <div className="col-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-12">
            {loading ? (
              // Skeleton loading grid
              <div className="row">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                    key={i}
                  >
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : (
              // Real carousel
              <OwlCarousel className="owl-theme" {...owlOptions}>
                {collections.map((item, index) => (
                  <div className="item" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={
                              item.nftImage ||
                              item.image ||
                              item.img ||
                              item.collectionImage
                            }
                            className="lazy img-fluid"
                            alt={
                              item.collectionName ||
                              item.name ||
                              item.title ||
                              "NFT"
                            }
                            style={{ width: "100%", height: "auto" }}
                          />
                        </Link>
                      </div>

                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={
                              item.authorImage ||
                              item.ownerImage ||
                              item.avatar
                            }
                            alt={item.authorName || "Author"}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>
                            {item.collectionName ||
                              item.name ||
                              item.title ||
                              "Collection"}
                          </h4>
                        </Link>
                        <span>
                          {item.code ||
                            item.symbol ||
                            item.category ||
                            "ERC-192"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;



