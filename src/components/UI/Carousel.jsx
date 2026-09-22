import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";

const Carousel = ({ loading, skeleton, children }) => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 16 },
    breakpoints: {
      "(max-width:1199.98px)": { slides: { perView: 3, spacing: 16 } },
      "(max-width:991.98px)": { slides: { perView: 2, spacing: 16 } },
      "(max-width:767.98px)": { slides: { perView: 1, spacing: 16 } },
    },
  });

  if (loading) return skeleton;

  return (
    <div className="position-relative">
      <div className="keen-slider" ref={sliderRef}>
        {children}
      </div>
      <button className="owl-prev" onClick={() => instanceRef.current?.prev()}>
        <i className="fa fa-chevron-left"></i>
      </button>
      <button className="owl-next" onClick={() => instanceRef.current?.next()}>
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Carousel;
