import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import NFTCard from "../UI/NFTCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/new-items.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

// Skeleton Loading Card
const SkeletonCard = () => {
  return (
    <div className="new-items-slide">
      <div className="nft__item new-items-skeleton">
        <div className="new-items-skeleton-avatar"></div>
        <div className="new-items-skeleton-image"></div>
        <div className="new-items-skeleton-line"></div>
        <div className="new-items-skeleton-line short"></div>
      </div>
    </div>
  );
};

// Main New Items Component
const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchItems = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL);

        console.log("New Items API Response:", response.data);

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data;

        if (!Array.isArray(data)) {
          throw new Error("Invalid API response");
        }

        if (active) {
          console.log("New Items count:", data.length);
          setItems(data);
        }
      } catch (err) {
        console.error("Error fetching New Items:", err);

        if (active) {
          setError("Unable to load New Items. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchItems();

    return () => {
      active = false;
    };
  }, []);

  // CAROUSEL SETTINGS
  const sliderSettings = {
    dots: false,

    // Infinite scrolling when more than 4 NFTs exist
    infinite: items.length > 4,

    // Animation speed
    speed: 500,

    // Show 4 NFTs on desktop
    slidesToShow: 4,

    // Move one NFT at a time
    slidesToScroll: 1,

    // Navigation arrows
    arrows: true,

    // Automatic sliding
    autoplay: true,
    autoplaySpeed: 3000,

    // Pause automatic sliding when hovering
    pauseOnHover: true,

    // Enable dragging and swiping
    swipe: true,
    draggable: true,
    touchMove: true,

    adaptiveHeight: false,

    // Responsive carousel
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">

        {/* Section Heading */}
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="row">
            {[1, 2, 3, 4].map((id) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={id}
              >
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center">
            <p>{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center">
            <p>No new items available.</p>
          </div>
        ) : (
          <div className="new-items-slider">
            <Slider {...sliderSettings}>
              {items.map((item, index) => (
                <div
                  key={item.id || item.nftId || index}
                  className="new-items-slide"
                >
                  {/* Reusable NFT Card */}
                  <NFTCard item={item} />
                </div>
              ))}
            </Slider>
          </div>
        )}

      </div>
    </section>
  );
};

export default NewItems;