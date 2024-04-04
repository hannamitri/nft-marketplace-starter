import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

function Next(props) {
  const { className, onClick } = props;
  return (
    <div>
      <FontAwesomeIcon
        icon={faChevronRight}
        onClick={onClick}
        className={className}
        id="btn"
      />
    </div>
  );
}
function Prev(props) {
  const { className, onClick } = props;
  return (
    <div>
      <FontAwesomeIcon
        icon={faChevronLeft}
        onClick={onClick}
        className={className}
        id="btn2"
      />
    </div>
  );
}

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <Next />,
  prevArrow: <Prev />,
  initialSlide: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
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

const CustomSlider = ({ children }) => {
  return (
    <div>
      <Slider {...sliderSettings}>{children}</Slider>
    </div>
  );
};

export default CustomSlider;
