import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Carousel = () => {
    return (
        <OwlCarousel className='owl-theme' loop margin={10} nav>
            <div className='item'>
                <h4>1</h4>
            </div>
            <div className='item'>
                <h4>2</h4>
            </div>
            <div className='item'>
                <h4>3</h4>
            </div>
            <div className='item'>
                <h4>4</h4>
            </div>
            <div className='item'>
                <h4>5</h4>
            </div>
        </OwlCarousel>
    );
};

export default Carousel;
