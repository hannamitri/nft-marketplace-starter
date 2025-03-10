import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./Carousel.css";
import Skeleton from "../UI/Skeleton";

const DefaultSkeleton = () => (
  <div className="skeleton-slide">
    <Skeleton type="image" className="skeleton-image" />
    <Skeleton 
      type="avatar"
      className="skeleton-circle"
      style={{
        marginTop: "-20px",
        position: "relative",
        zIndex: 1,
        border: "2px solid white",
      }}
    />
    <Skeleton
      type="title"
      className="skeleton-title"
      style={{ marginTop: "10px" }}
    />
    <Skeleton
      type="subtitle"
      className="skeleton-subtitle"
      style={{ marginTop: "8px" }}
    />
  </div>
);

const Carousel = ({ children, skeletonItem }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderInstance, setSliderInstance] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loaded) {
        console.log("Forcing carousel to load after timeout");
        setLoaded(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [loaded]);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 1400px)": {
        slides: { perView: 4, spacing: 20 },
      },

      "(min-width: 1200px) and (max-width: 1399px)": {
        slides: { perView: 4, spacing: 15 },
      },

      "(min-width: 992px) and (max-width: 1199px)": {
        slides: { perView: 3, spacing: 15 },
      },

      "(min-width: 768px) and (max-width: 991px)": {
        slides: { perView: 2, spacing: 15 },
      },

      "(min-width: 576px) and (max-width: 767px)": {
        slides: { perView: 2, spacing: 10 },
      },

      "(min-width: 480px) and (max-width: 575px)": {
        slides: { perView: 1, spacing: 0 },
      },

      "(max-width: 479px)": {
        slides: { perView: 1, spacing: 0 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      console.log("Keen Slider created");
      setLoaded(true);
      setSliderInstance(slider);
    },
  });

  const isLastSlide = loaded && sliderInstance && 
    currentSlide === sliderInstance.track.details.slides.length - 1;
  const isFirstSlide = currentSlide === 0;

  const SkeletonComponent = skeletonItem || DefaultSkeleton;

  const skeletonItems = Array(4)
    .fill(0)
    .map((_, index) => (
      <div
        key={`skeleton-${index}`}
        className="keen-slider__slide skeleton-slide-container"
      >
        <SkeletonComponent />
      </div>
    ));

  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className="slider-container position-relative">
      {!loaded || !hasChildren ? (
        <div className="keen-slider skeleton-slider">{skeletonItems}</div>
      ) : (
        <>
          <div ref={sliderRef} className="keen-slider">
            {React.Children.map(children, (child) => (
              <div className="keen-slider__slide">{child}</div>
            ))}
          </div>

          <Arrow
            left
            onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
            disabled={isFirstSlide}
          />

          <Arrow
            onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
            disabled={isLastSlide}
          />
        </>
      )}
    </div>
  );
};

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: props.left ? "5px" : "auto",
        right: props.left ? "auto" : "5px",
        height: "40px", 
        width: "40px", 
        cursor: props.disabled ? "default" : "pointer",
        zIndex: 10,
        fill: props.disabled ? "#ccc" : "#000",
        background: "rgb(255, 255, 255)",
        borderRadius: "50%",
        padding: "8px", 
        opacity: props.disabled ? 0.5 : 1,
      }}
    >
      {props.left && <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />}
      {!props.left && (
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      )}
    </svg>
  );
}

export default Carousel;
