import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Item from "../Item";
import Skeleton from "../UI/Skeleton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const { id } = useParams();
  const [getHotCollection, setHotCollection] = useState([]);
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
      window.requestAnimationFrame(() => {
        setCurrentSlide(slider.track.details.rel);
      });
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

  const fetchHotCollections = async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setHotCollection(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchHotCollections();
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [getHotCollection]);

  useEffect(() => {
    if (!sliderRef.current || !instanceRef.current) return;

    const handleUpdate = () => {
      if (instanceRef.current) instanceRef.current.update();
    };

    const imgs = sliderRef.current.querySelectorAll("img");

    imgs.forEach((img) => {
      if (img.complete) {
        handleUpdate();
      } else {
        img.addEventListener("load", handleUpdate);
      }
    });

    window.addEventListener("resize", handleUpdate);

    return () => {
      imgs.forEach((img) => img.removeEventListener("load", handleUpdate));

      window.removeEventListener("resize", handleUpdate);
    };
  }, [loaded, getHotCollection]);

  const slides = useMemo(() => {
    if (loading) {
      return new Array(6).fill(0).map((_, index) => (
        <div className="keen-slider__slide" key={index}>
          <div className="nft_wrap">
            <Skeleton width="100%" height="200px" />
          </div>
          <div className="nft_coll_pp">
            <Skeleton width="50px" height="50px" borderRadius="50%" />
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Skeleton width="100px" height="20px" />
            <Skeleton width="60px" height="20px" />
          </div>
        </div>
      ));
    }

    return getHotCollection.map((item) => (
      <div className="keen-slider__slide" key={item.id}>
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to={`/item-details/${item.nftId}`}>
              <img
                src={item.nftImage}
                className="lazy img-fluid"
                alt={item.title}
                loading="lazy"
              />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to={`/author/${item.authorId}`}>
              <img
                className="lazy pp-coll"
                src={item.authorImage}
                alt="author"
                loading="lazy"
              />
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{item.title}</h4>
            </Link>
            <span>ERC-{item.code}</span>
          </div>
        </div>
      </div>
    ));
  }, [loading, getHotCollection]);

  const Arrow = React.memo(({ left, onClick }) => (
    <button
      className={`arrow ${left ? "arrow--left" : "arrow--right"}`}
      onClick={onClick}
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
  ));

  return (
    <section id="section-hot-collections" className="no-bottom">
      <div className="container">
        <div data-aos="fadeIn" className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {slides}
            </div>

            {/* Arrows */}
            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                />
                <Arrow
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
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

export default React.memo(HotCollections);
