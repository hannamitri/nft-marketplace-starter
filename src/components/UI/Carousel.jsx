import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React from "react";
import OwlCarousel from "react-owl-carousel";

const Carousel = ({ children }) => {
  const options = {
    defaultitemwidth: 535,
    items: 4,
    loop: true,
    margin: 10,
    autoplay: false,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      983: { items: 3 },
      1198: { items: 4 },
    },
  };
  return (
    <OwlCarousel className="owl-theme" {...options}>
      {children}
    </OwlCarousel>
  );
};

export default Carousel;
