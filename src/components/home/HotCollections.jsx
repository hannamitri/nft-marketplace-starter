import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import LoadingSkeleton from "./LoadingSkeleton"; // Import the skeleton component

const HotCollectionsCarousel = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const apiUrl = "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(apiUrl);
        setCollections(response.data);
        setLoading(false); // Set loading to false after successful fetch
      } catch (error) {
        console.error("Error fetching collections:", error);
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchCollections();
  }, []);

  const carouselOptions = {
    loop: collections.length > 4,
    margin: 30,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
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
          <div className="col-lg-12">
            {loading ? (
              <LoadingSkeleton />
            ) : collections.length > 0 ? (
              <OwlCarousel className="owl-theme" {...carouselOptions}>
                {collections.map((collection) => (
                  <div key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt={collection.title}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
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
                ))}
              </OwlCarousel>
            ) : (
              <p>No collections found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollectionsCarousel;