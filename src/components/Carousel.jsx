import React from 'react';
import Slider from 'react-slick';

const Carousel = ({ children }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 },
            },
        ],
    };

  return <Slider {...settings}>
    {React.Children.map(children, (child) => (
        <div className='px-2'>
            {child}
        </div>
    ))}
  </Slider>;
};

export default Carousel;
