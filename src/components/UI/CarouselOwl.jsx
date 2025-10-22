import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const CarouselOwl = ({ children, options = {} }) => {
  const defaultOptions = {
    items: 4,             // show 4 cards
    margin: 16,
    slideBy: 1,
    nav: true,            // shows arrows (your CSS already styles them)
    dots: false,
    loop: true,
    responsive: {
      0: { items: 1, margin: 12, slideBy: 1 },
      640: { items: 2, margin: 14, slideBy: 1 },
      1024: { items: 3, margin: 16, slideBy: 1 },
      1280: { items: 4, margin: 16, slideBy: 1 },
    },
  };

  return (
    <OwlCarousel className="owl-theme" {...defaultOptions} {...options}>
      {children}
    </OwlCarousel>
  );
};

export default CarouselOwl;
