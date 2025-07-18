import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HotCollectionsSlider.css";

const HotCollectionsSlider = () => {
  const [collectionsData, setCollectionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const data = await response.json();
        setCollectionsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? collectionsData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === collectionsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Get 4 items starting from currentIndex, wrapping around if needed
  const getVisibleSlides = () => {
    const visibleSlides = [];
    for (let i = 0; i < 4; i++) {
      visibleSlides.push(collectionsData[(currentIndex + i) % collectionsData.length]);
    }
    return visibleSlides;
  };

  const visibleSlides = getVisibleSlides();

  if (loading) {
    return (
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="text-center">
            <h2>Hot Collections Slider</h2>
            <div className="small-border bg-color-2"></div>
          </div>
          <div className="slider-wrapper">
            <p>Loading collections...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>Hot Collections Slider</h2>
          <div className="small-border bg-color-2"></div>
        </div>
        <div className="slider-wrapper">
          <button className="slider-btn prev-btn" onClick={prevSlide}>
            &#10094;
          </button>
          {visibleSlides.map((collection) => (
            <div key={collection.nftId} className="slide active" onClick={() => navigate(`/collection/${collection.nftId}`)} style={{ cursor: "pointer" }}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <img
                    src={collection.nftImage}
                    className="lazy img-fluid"
                    alt={collection.title}
                  />
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${collection.authorId}`}>
                    <img
                      className="lazy pp-coll"
                      src={collection.authorImage}
                      alt={collection.title + " author"}
                    />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <h4>{collection.title}</h4>
                  <span>{collection.category}</span>
                </div>
              </div>
            </div>
          ))}
          <button className="slider-btn next-btn" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotCollectionsSlider;
