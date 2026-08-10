import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "./HotCollections.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import "./HotCollections.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

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

 useEffect(() => {
  const fetchCollections = async () => {
    try {
      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      setCollections(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  };

    fetchCollections();
 }, []);

useEffect(() => {
  if (instanceRef.current) {
    instanceRef.current.update();
  }
}, [collections, instanceRef]);

const handlePrev = () => {
  instanceRef.current?.prev();
};

const handleNext = () => {
  instanceRef.current?.next();
};

if (loading) {
  return (
    <section className="no-bottom">
      <div className="container">
        <h3>Loading collections...</h3>
      </div>
    </section>
  );
}

if (!collections.length) {
  return (
    <section className="no-bottom">
      <div className="container">
        <h3>No collections found.</h3>
      </div>
    </section>
  );
}

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
              {collections.map((collection) => (
                  <div
                    key={collection.id}
                    className="keen-slider__slide"
                  >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                     <Link to={`/item-details/${collection.id}`}>
                        <img
                          src={collection.nftImage || nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage || AuthorImage}
                          alt={collection.title}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4> 
                      </Link>

                      <span>
                        {collection.code ? `Code: ${collection.code}` : "No code available"}
                        </span>
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

export default HotCollections;
