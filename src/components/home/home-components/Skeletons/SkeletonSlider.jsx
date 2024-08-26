import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonNewItems from './SkeletonNewItems';


const SkeletonSlider = () => {
    const options = {
        items:4,
        loop:true,
        margin:12,
        nav:true,
        dots:false,
        responsive: {
            0: {
                items:1
            },
            480:{
                items:2
            }, 
            900:{
                items:3
            },
            1200:{
                items:4
            }

        }
    }
    return ( 
        <OwlCarousel className='owl-theme' {...options}>
            <SkeletonNewItems />
            <SkeletonNewItems />
            <SkeletonNewItems />
            <SkeletonNewItems />
            <SkeletonNewItems />
            <SkeletonNewItems />
        </OwlCarousel>
    );
}
 
export default SkeletonSlider;