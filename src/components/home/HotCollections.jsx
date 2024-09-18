import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = () => {
      setTimeout(async () => {
        try {
          const response = await fetch(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
          );
          const data = await response.json();
          setCollections(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching collections:", error);
          setLoading(false);
        }
      }, 2000);
    };

    fetchCollections();
  }, []);
  // OwlCarousel options
  const options = {
    loop: true, // Enables infinite looping
    margin: 10, // Adds space between items
    nav: true, // Enables left/right navigation arrows
    dots: false, // Disables pagination dots
    items: 4, // Show 4 items at a time (default)
    slideBy: 1, // Move 1 NFT at a time when sliding
    autoplay: false, // Disable autoplay
    responsive: {
      0: { items: 1 }, // 1 NFT for screens 0px and up
      768: { items: 2 }, // 2 NFTs for screens 768px and up (tablets)
      1024: { items: 4 }, // 4 NFTs for screens 1024px and up (desktops)
    },
  };
  // Skeleton loader
  const SkeletonLoader = () => (
    <OwlCarousel className="owl-theme" {...options}>
      {new Array(4).fill(0).map((_, index) => (
        <div className="item" key={index}>
          <div className="nft_coll">
            <div className="nft_wrap skeleton skeleton-img"></div>
            <div className="nft_coll_pp">
              <div className="skeleton skeleton-author"></div>
            </div>
            <div className="nft_coll_info">
              <div className="skeleton skeleton-info"></div>
            </div>
          </div>
        </div>
      ))}
    </OwlCarousel>
  );

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
            <SkeletonLoader />
          ) : (
            <OwlCarousel className="owl-theme" {...options}>
              {collections.map((collection, index) => (
                <div className="item" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      {/* Include nftId in the URL */}
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage || nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage || AuthorImage}
                          alt={collection.authorName}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      {/* Include nftId in the title link */}
                      <Link to={`/item-details/${collection.nftId}`}>
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
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
