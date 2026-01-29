import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";
import { ChevronRight, ChevronLeft } from "lucide-react";

function Carousel({ collection }) {
  const sliderRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function prevSlide() {
    sliderRef.current?.slickPrev();
  }

  function nextSlide() {
    sliderRef.current?.slickNext();
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[])

  const getSlidesToShow = () => {
    if (windowWidth <= 768) return 1;
    if (windowWidth <= 992) return 2;
    if (windowWidth <= 1200) return 3;
    return 4;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    arrows: false, // Disable default arrows to use custom buttons
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div 
      data-aos="fade-in" 
      data-aos-delay="100"
      className="slider-container" 
      style={{ padding: "0 15px" }} >
      <button onClick={() => prevSlide()} className="carousel-btn chevronLeft">
        <ChevronLeft size={24} />
      </button>

      <button onClick={() => nextSlide()} className="carousel-btn chevronRight">
        <ChevronRight size={24} />
      </button>

      <Slider {...settings} ref={sliderRef} key={collection?.length || 'empty'} >
        {collection}
      </Slider>
    </div>
  );
}

export default Carousel;
