import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useKeenSlider } from "keen-slider/react";
import "./NewItems.css";

const NewItems = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdowns, setCountdowns] = useState({});

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 992px)": {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      "(max-width: 576px)": {
        slides: {
          perView: 1,
          spacing: 12,
        },
      },
    },
  });

  const handlePrev = () => {
    instanceRef.current?.prev();
  };

  const handleNext = () => {
    instanceRef.current?.next();
  };

  useEffect(() => {
    instanceRef.current?.update();
  }, [collections, instanceRef]);
  
  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        console.log("API Response:", response.data);

        setCollections(response.data || []);
      } catch (err) {
        setError(err.message || "An error occurred while fetching new items.");
      } finally {
        setLoading(false);
      }
    };  

    fetchNewItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdowns = {};

      collections.forEach((collection) => {
        if (!collection.expiryDate) {
          updatedCountdowns[collection.id] = "00:00:00";
          return;
        }

        const distance = collection.expiryDate - Date.now();
        if (distance <= 0) {
          updatedCountdowns[collection.id] = "00:00:00";
          return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updatedCountdowns[collection.id] =
          `${String(hours).padStart(2, "0")}:` +
          `${String(minutes).padStart(2, "0")}:` +
          `${String(seconds).padStart(2, "0")}`;
      });

      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [collections]);


  if (loading) return <section id="section-items" className="no-bottom"><div className="container"><p>Loading...</p></div></section>;
  if (error) return <section id="section-items" className="no-bottom"><div className="container"><p>Error: {error}</p></div></section>;

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

  <div className="col-lg-12">
    <div className="slider-wrapper">

      <button
        className="hc-arrow hc-prev"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <button
        className="hc-arrow hc-next"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>

      <div ref={sliderRef} className="keen-slider">

        {collections.map((collection, index) => (
          <div
            key={collection.id || index}
            className="keen-slider__slide"
          >
            <div className="nft__item">

              <div className="author_list_pp">
                <Link
                  to={`/author/${collection.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`Creator: ${collection.author}`}
                >
                  <img
                    className="lazy"
                    src={collection.authorImage || AuthorImage}
                    alt={collection.author}
                  />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              {collection.expiryDate && (
                <div className="de_countdown">
                  {countdowns[collection.id] || "00:00:00"}
                </div>
              )}

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>

                    <div className="nft__item_share">
                      <h4>Share</h4>

                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>

                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>

                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <Link to={`/item-details/${collection.nftId}`}>
                  <img
                    src={collection.nftImage || nftImage}
                    className="lazy nft__item_preview"
                    alt={collection.title}
                  />
                </Link>
              </div>

              <div className="nft__item_info">
                <Link to={`/item-details/${collection.nftId}`}>
                  <h4>{collection.title}</h4>
                </Link>

                <div className="nft__item_price">
                  {Number(collection.price).toFixed(2)} ETH
                </div>

                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{collection.likes}</span>
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  </div>

</div>
      </div>
    </section>
  );
};

export default NewItems;
