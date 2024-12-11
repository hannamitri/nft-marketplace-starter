import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import './owlCarousel.css'

OwlCarousel = ()=> {

    const options = {
        loop: true,
        margin: 10,
        nav: true,
        navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    };
}


export default OwlCarousel;