import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Slider from "react-slick";

const Carousel = ({ items, isLoading }) => {

    const [slidesToShow, setSlidesToShow] = useState(4);

    const displayItems = isLoading
    ? new Array(4).fill({ id: '', nftId: '', nftImage: '', authorImage: '', title: '', code: '' })
     : items;

    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth <= 550) {
                setSlidesToShow(1)
            } else if (window.innerWidth <= 768) {
                setSlidesToShow(2)
            }
            else {
                setSlidesToShow(4)
            }
        }
        
        window.addEventListener('resize', updateSlidesToShow);
        updateSlidesToShow();

        return () => {
            window.removeEventListener('resize', updateSlidesToShow)
        }
    }, [])

    const sliderSettings = {
        dots: false, 
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        arrows: true 
    };

    return (
        <Slider {...sliderSettings} >
            {displayItems.map((item, index) => (
                <div className="carousel-item" key={index}>
                    <div className={`card ${isLoading ? 'skeleton-box' : ''}`} >
                        <div className="card-body">
                            <Link to={`/item-details/${item.nftId}`} key={item.nftId} >
                                <img src={item.nftImage} className="slide-img" alt="" />
                            </Link>
                        </div>
                        <div className="avatar">
                            <Link to={`/authors`}>
                                <img className="avatar--img" src={item.authorImage} alt="" />
                            </Link>
                            <i className="fa fa-check"></i>
                        </div>
                        <div className="card-info">
                            <Link to="/explore">
                                <h4>{item.title}</h4>
                            </Link>
                            <span>ERC-{item.code}</span>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
  }

export default Carousel;