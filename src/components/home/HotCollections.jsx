import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Item from "../Item";
import Skeleton from "../UI/Skeleton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const { id } = useParams();
  const [getCollection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    slides: {
      origin: "left",
      perView: 4,
      spacing: 10,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel.add);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(min-width: 150px)": {
        slides: { perView: 1 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 992px)": {
        slides: { perView: 3, spacing: 5 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
  });

  const fetchCollections = async () => {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections?`
      );
      setCollection(data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  function Arrow({ left, disabled, onClick }) {
    return (
      <button
        className={`arrow ${left ? "arrow--left" : "arrow--right"} ${
          disabled ? "arrow--disabled" : ""
        }`}
        onClick={onClick}
        disabled={disabled}
        aria-label={left ? "Previous slide" : "Next slide"}
      >
        {left ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16.67 0l2.83 2.829-9.34 9.175 9.34 9.167-2.83 2.829L4.5 12z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M7.33 24l-2.83-2.829 9.34-9.175-9.34-9.167L7.33 0l12.17 12z" />
          </svg>
        )}
      </button>
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

          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {loading
                ? // Skeleton loader slides
                  new Array(6).fill(0).map((_, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <div className="nft_wrap">
                        <Link to="">
                          <Skeleton width="100%" height="200px" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="">
                          <Skeleton width="100px" height="20px" />
                        </Link>
                        <br />
                        <Skeleton width="60px" height="20px" />
                      </div>
                    </div>
                  ))
                : // Real collection slides
                  getCollection.length > 0 &&
                  getCollection.map((item) => (
                    <div className="keen-slider__slide" key={item.id}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy img-fluid"
                              alt={item.title}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage}
                              alt="author"
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{item.title}</h4>
                          </Link>
                          <span>{item.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {/* Arrows */}
            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />

                <Arrow
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide ===
                    instanceRef.current.track.details.slides.length - 1
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
