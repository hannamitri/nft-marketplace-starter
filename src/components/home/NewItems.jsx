import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Item from "../Item";
import AOS from "aos";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCurrentSlide, setNewCurrentSlide] = useState(0);
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
      setNewCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 992px)": {
        slides: { perView: 3, spacing: 8 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 4, spacing: 5 },
      },
    },
  });

  const fetchNewItems = async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewItems().then(() => {
      AOS.refresh();
    });
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [items]);

  const handlePrev = useCallback(() => {
    instanceRef.current?.prev();
  }, [instanceRef]);

  const handleNext = useCallback(() => {
    instanceRef.current?.next();
  }, [instanceRef]);

  const Arrow = React.memo(function Arrow({ left, onClick }) {
    return (
      <button
        className={`arrow ${left ? "arrow-left" : "arrow-right"}`}
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
    );
  });

  return (
    <section id="section-new-items" className="no-bottom">
      <div className="container">
        <div data-aos="fadeIn" className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fadeIn">New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {loading
                ? new Array(7).fill(0).map((_, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <Skeleton width="100%" height="350px" />
                    </div>
                  ))
                : items.map((item) => (
                    <div className="keen-slider__slide" key={item.id}>
                      <Item {...item} />
                    </div>
                  ))}
            </div>

            {/* Arrows */}
            {loaded && instanceRef.current && (
              <>
                <Arrow left onClick={handlePrev} />
                <Arrow onClick={handleNext} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(NewItems);
