import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch NFT items from API
  useEffect(() => {
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );

      console.log("NFT API data:", response.data);

      setItems(Array.isArray(response.data) ? response.data : []);

    } catch (error) {
      console.error("API Error:", error);
      console.error("Error Response:", error.response);
      setError("Unable to load new items.");

    } finally {
      // Keep skeleton visible for at least 1 second
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  fetchItems();
}, []);

  // Owl Carousel settings
  const carouselOptions = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="text-center">
            <h2>New Items</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="row">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6"
                key={index}
              >
                <div className="item">
                  <div className="nft__item skeleton-card">

                    <Skeleton
                      width="100%"
                      height="200px"
                      borderRadius="8px"
                    />

                    <Skeleton
                      width="45px"
                      height="45px"
                      borderRadius="50%"
                    />

                    <Skeleton
                      width="70%"
                      height="20px"
                      borderRadius="5px"
                    />

                    <Skeleton
                      width="40%"
                      height="15px"
                      borderRadius="5px"
                    />

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

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

        {/* NFT Carousel */}
        <OwlCarousel
          className="owl-theme"
          {...carouselOptions}
        >
          {items.map((item, index) => (
            <div className="item" key={item.id || index}>
              <div className="nft__item">

                {/* Creator Image */}
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    state={{
                      author: {
                        authorId: item.authorId,
                        authorImage: item.authorImage,
                        authorName: item.authorName || "Unknown author",
                      },
                    }}
                    title={`Creator: ${item.authorName || "Unknown"}`}
                  >
                    <img
                      className="lazy"
                      src={item.authorImage || AuthorImage}
                      alt={item.authorName || "NFT creator"}
                      loading="lazy"
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {/* Countdown */}
                <Countdown expiryDate={item.expiryDate} />

                {/* NFT Image */}
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>

                      <div className="nft__item_share">
                        <h4>Share</h4>

                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>

                        <a href="#" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>

                        <a href="mailto:">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details" state={{ item: item}}>
                    <img
                      src={item.nftImage || nftImage}
                      className="nft__item_preview"
                      alt={item.title || "NFT artwork"}
                      loading="lazy"
                    />
                  </Link>
                </div>

                {/* NFT Information */}
                <div className="nft__item_info">
                  <Link to="/item-details" state={{ item: item }}>
                    <h4>{item.title || "Untitled NFT"}</h4>
                  </Link>

                  <div className="nft__item_price">
                    {item.price ?? "N/A"} ETH
                  </div>

                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes ?? 0}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </OwlCarousel>

      </div>
    </section>
  );
};

export default NewItems;