import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

// Helper function to calculate time remaining for NFT expiry
const getTimeRemaining = (expiryTime) => {
  const timeDifference = new Date(expiryTime).getTime() - new Date().getTime();
  if (timeDifference <= 0) {
    return "Expired"; // If time is up, display "Expired"
  }
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`; // Return time in h m s format
};

const NewItems = () => {
  const [newItems, setNewItems] = useState([]); // State to store NFT items
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetching new items from the API on component mount
  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const data = await response.json(); // Parse the response as JSON
        setNewItems(data); // Set the NFT items to state
        setLoading(false); // Loading complete
      } catch (error) {
        console.error("Error fetching new items:", error);
        setLoading(false); // In case of error, stop the loading state
      }
    };

    fetchNewItems();
  }, []); // Dependency array empty, so this effect runs only once

  // Timeout to simulate skeleton loading state for troubleshooting purposes
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout); // Clean up the timeout
  }, []);

  // OwlCarousel options for responsiveness and navigation
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    items: 4,
    slideBy: 1,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 4 },
    },
  };

  // Skeleton loader component to display during loading
  const SkeletonLoader = () => (
    <OwlCarousel className="owl-theme" {...options}>
      {new Array(4).fill(0).map((_, index) => (
        <div className="item" key={index}>
          <div className="nft_coll skeleton skeleton-img"></div> {/* Skeleton effect */}
        </div>
      ))}
    </OwlCarousel>
  );

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <SkeletonLoader /> // Display skeleton loader when loading
          ) : (
            <OwlCarousel className="owl-theme" {...options}>
              {newItems.map((item) => (
                <div className="item" key={item.id}>
                  <div className="nft__item">
                    {/* Author section */}
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy"
                          src={item.authorImage || AuthorImage}
                          alt={item.authorName}
                        />
                        <i className="fa fa-check"></i> {/* Verified icon */}
                      </Link>
                    </div>

                    {/* Countdown to show time remaining for NFT expiry */}
                    <div className="de_countdown">
                      {getTimeRemaining(item.expiryDate)}
                    </div>

                    {/* NFT image section */}
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage || nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    {/* NFT info section */}
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4> {/* NFT title */}
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div> {/* NFT price */}
                      {/* Display likes from the API, without ability to increment */}
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i> {/* Heart icon */}
                        <span>{item.likes || 0}</span> {/* Display likes from the API */}
                      </div>
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

export default NewItems;
