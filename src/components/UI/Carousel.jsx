import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PreviousArrow = ({ onClick }) => (
  <button
    type="button"
    className="slider-arrow slider-arrow-left"
    onClick={onClick}
    aria-label="Previous collection"
  >
    <FaChevronLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    type="button"
    className="slider-arrow slider-arrow-right"
    onClick={onClick}
    aria-label="Next collection"
  >
    <FaChevronRight />
  </button>
);

const defaultSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
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

export default function Carousel({ children, settings = {}, className = "" }) {
  const carouselSettings = {
    ...defaultSettings,
    ...settings,
  };

  return (
    <Slider {...carouselSettings} className={className}>
      {children}
    </Slider>
  );
}