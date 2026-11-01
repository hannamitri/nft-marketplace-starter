import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey"}}
      onClick={onClick}
    />
  );
}


const SliderTool = ({ children }) => {
  const settings = {
    dots: false,          
    infinite: true,      
    speed: 500,          
    slidesToShow: 4,     
    slidesToScroll: 1,   
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,  
  };

  return (
    <Slider {...settings}>
      {children}
    </Slider>
  );
};

export default SliderTool;