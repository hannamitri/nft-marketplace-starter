import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";

const useResponsiveCarousel = (itemCount) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider({
    mode: "snap",
    loop: itemCount > 1,
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      "(min-width: 576px)": { slides: { perView: 2, spacing: 16 } },
      "(min-width: 768px)": { slides: { perView: 4, spacing: 16 } },
    },
    slideChanged(instance) {
      setCurrentSlide(instance.track.details.rel);
    },
  });

  return { currentSlide, slider, sliderRef };
};

export default useResponsiveCarousel;
