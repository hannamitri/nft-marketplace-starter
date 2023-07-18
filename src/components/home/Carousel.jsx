import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// export default class SimpleSlider extends Component {
  const Carousel = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    console.log("no errors in our carousel jsx file ")
    return (
      <div>
        {/* <h2> Single Item</h2> */}
        <Slider {...settings}>
          {[1,2,3,4].map((item, index) => {return <div key={index}>{item}</div>})}
        </Slider>
      </div>
    );
}

export default Carousel